import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { postToML } from '@/lib/mlClient';
import { Resume } from '@/models/Resume';
import { JobProfile } from '@/models/JobProfile';
import { Analysis } from '@/models/Analysis';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * Helper: Generate a summary based on match score and skill overlap
 */
function generateSummary(
  matchScore: number,
  matched: string[],
  missingCore: string[]
): string {
  if (matchScore >= 80) {
    return `Strong match (${matchScore}%)! You have ${matched.length} key skills already. Focus on mastering the ${missingCore.length} core skill${missingCore.length !== 1 ? 's' : ''} you're missing.`;
  } else if (matchScore >= 60) {
    return `Good potential (${matchScore}%). You have ${matched.length} relevant skills. Consider upskilling in ${missingCore.length} core area${missingCore.length !== 1 ? 's' : ''} to improve your match.`;
  } else if (matchScore >= 40) {
    return `Moderate match (${matchScore}%). Building on your current ${matched.length} skills, focus on the ${missingCore.length} core requirement${missingCore.length !== 1 ? 's' : ''} first.`;
  } else {
    return `Growth opportunity (${matchScore}%). You have ${matched.length} relevant skills. Prioritize learning the ${missingCore.length} core skill${missingCore.length !== 1 ? 's' : ''} that are in high demand.`;
  }
}

/**
 * Helper: Generate recommended next steps based on missing skills
 */
function generateRecommendations(missingCore: string[]): string[] {
  if (missingCore.length === 0) {
    return ['You meet all core requirements!', 'Consider learning nice-to-have skills to stand out'];
  }

  const recommendations: string[] = [];
  for (let i = 0; i < Math.min(missingCore.length, 3); i++) {
    const skill = missingCore[i];
    recommendations.push(`Study and practice ${skill}`);
  }

  if (missingCore.length > 3) {
    recommendations.push(`Continue building expertise in remaining ${missingCore.length - 3} skills`);
  }

  return recommendations;
}

/**
 * POST /api/analysis/run
 *
 * Compare resume skills vs job profile skills.
 * Returns match score and skill breakdown.
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated. Please log in.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { resumeId, jobProfileId } = body;

    // Validate inputs
    if (!resumeId || !jobProfileId) {
      return NextResponse.json(
        { error: 'Missing required fields: resumeId, jobProfileId' },
        { status: 400 }
      );
    }

    // Connect to DB
    await connectDB();

    // Validate that resumeId and jobProfileId are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(resumeId)) {
      return NextResponse.json(
        { error: 'Invalid resumeId format' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(jobProfileId)) {
      return NextResponse.json(
        { error: 'Invalid jobProfileId format' },
        { status: 400 }
      );
    }

    // Load documents
    const resumeDoc = await Resume.findById(resumeId);
    if (!resumeDoc) {
      return NextResponse.json(
        { error: 'Resume not found' },
        { status: 404 }
      );
    }

    const jobProfileDoc = await JobProfile.findById(jobProfileId);
    if (!jobProfileDoc) {
      return NextResponse.json(
        { error: 'Job profile not found' },
        { status: 404 }
      );
    }

    // Extract skill arrays
    const resumeSkills = resumeDoc.parsed?.skills || [];
    const jobRequired = jobProfileDoc.parsed?.requiredSkills || [];
    const jobNiceToHave = jobProfileDoc.parsed?.niceToHaveSkills || [];

    // Validate arrays - provide helpful guidance if empty
    if (!Array.isArray(resumeSkills) || resumeSkills.length === 0) {
      return NextResponse.json(
        { error: 'Resume has no extracted skills. Please upload a parsed resume.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(jobRequired) || jobRequired.length === 0) {
      return NextResponse.json(
        { error: 'Job profile contains no required skills. Ensure the job was parsed correctly.' },
        { status: 400 }
      );
    }

    // Call ML service
    let analysisResult;
    try {
      analysisResult = await postToML<{
        matchScore: number;
        matchedSkills: string[];
        missingCore: string[];
        missingOptional: string[];
        extraSkills: string[];
      }>('/ml/analysis/compare', {
        resumeSkills,
        jobRequired,
        jobNiceToHave,
      });
    } catch (mlError: any) {
      console.error('[/api/analysis/run] ML service call failed:', mlError);
      return NextResponse.json(
        { error: 'ML service unavailable' },
        { status: 502 }
      );
    }

    // Generate summary and recommendations
    const summary = generateSummary(
      analysisResult.matchScore,
      analysisResult.matchedSkills,
      analysisResult.missingCore
    );
    const recommendedNextSteps = generateRecommendations(
      analysisResult.missingCore
    );

    // Save Analysis document
    const analysisDoc = await Analysis.create({
      userId,
      resumeId: new mongoose.Types.ObjectId(resumeId),
      jobProfileId: new mongoose.Types.ObjectId(jobProfileId),
      matchScore: analysisResult.matchScore,
      skillOverlap: {
        matchedSkills: analysisResult.matchedSkills,
        missingCoreSkills: analysisResult.missingCore,
        missingNiceToHaveSkills: analysisResult.missingOptional,
        extraSkills: analysisResult.extraSkills,
      },
      summary,
      recommendedNextSteps,
    });

    // Return response (normalize IDs to strings)
    return NextResponse.json(
      {
        analysisId: analysisDoc._id.toString(),
        matchScore: analysisResult.matchScore,
        overlap: {
          matchedSkills: analysisResult.matchedSkills,
          missingCore: analysisResult.missingCore,
          missingOptional: analysisResult.missingOptional,
          extraSkills: analysisResult.extraSkills,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[/api/analysis/run] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
