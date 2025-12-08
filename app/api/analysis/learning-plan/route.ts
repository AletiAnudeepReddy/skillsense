import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/db';
import { Analysis } from '@/models/Analysis';
import { LearningPlan } from '@/models/LearningPlan';
import { postToML } from '@/lib/mlClient';
import { Types } from 'mongoose';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * POST /api/analysis/learning-plan
 * Generate a learning plan for an analysis
 */
export async function POST(request: Request) {
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
    const { analysisId } = body;

    // Validate analysisId
    if (!analysisId) {
      return NextResponse.json(
        { error: 'analysisId is required' },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(analysisId)) {
      return NextResponse.json(
        { error: 'Invalid analysisId format' },
        { status: 400 }
      );
    }

    await connectDB();

    // Fetch analysis document
    const analysis = await Analysis.findById(analysisId).lean();

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }

    // Extract missing skills from analysis
    const missingCore = analysis.skillOverlap.missingCoreSkills || [];
    const missingOptional = analysis.skillOverlap.missingNiceToHaveSkills || [];

    // Call ML service to generate learning plan
    let mlResponse;
    try {
      mlResponse = await postToML('/ml/analysis/learning-plan', {
        missingCore,
        missingOptional,
        jobRole: null, // TODO: Extract from JobProfile if needed
      });
    } catch (mlError: any) {
      console.error('[POST /api/analysis/learning-plan] ML service error:', mlError);
      return NextResponse.json(
        { error: 'ML service unavailable' },
        { status: 502 }
      );
    }

    // Create learning plan document in MongoDB
    const learningPlan = new LearningPlan({
      userId,
      analysisId: analysis._id,
      plan: (mlResponse as any).plan,
      estimatedTimelineWeeks: (mlResponse as any).estimatedTimelineWeeks,
    });

    await learningPlan.save();

    return NextResponse.json(
      {
        learningPlanId: learningPlan._id.toString(),
        analysisId: analysisId,
        estimatedTimelineWeeks: learningPlan.estimatedTimelineWeeks,
        plan: learningPlan.plan,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[POST /api/analysis/learning-plan]', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
