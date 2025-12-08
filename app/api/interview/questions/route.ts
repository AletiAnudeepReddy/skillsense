import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Analysis from '@/models/Analysis';
import { getQuestionsForRole } from '@/lib/interviewBank';
import type { InterviewQuestion } from '@/lib/interviewBank';

/**
 * Simple heuristic to infer role tag from job title
 */
function inferRoleTagFromJobTitle(
  jobTitle: string
): 'fullstack' | 'frontend' | 'backend' | 'data' | 'devops' | 'general' {
  const lowerTitle = jobTitle.toLowerCase();

  if (lowerTitle.includes('frontend') || lowerTitle.includes('react')) return 'frontend';
  if (lowerTitle.includes('backend') || lowerTitle.includes('api')) return 'backend';
  if (lowerTitle.includes('data') || lowerTitle.includes('machine learning') || lowerTitle.includes('ml'))
    return 'data';
  if (lowerTitle.includes('devops') || lowerTitle.includes('infrastructure') || lowerTitle.includes('sre'))
    return 'devops';
  if (lowerTitle.includes('fullstack') || lowerTitle.includes('full stack')) return 'fullstack';

  // Default to fullstack
  return 'fullstack';
}

/**
 * Infer seniority level from job posting text (simple heuristics)
 */
function inferLevelFromJobTitle(jobTitle: string): 'junior' | 'mid' | 'senior' {
  const lowerTitle = jobTitle.toLowerCase();

  if (lowerTitle.includes('senior') || lowerTitle.includes('principal') || lowerTitle.includes('lead'))
    return 'senior';
  if (lowerTitle.includes('junior') || lowerTitle.includes('entry')) return 'junior';

  return 'mid';
}

/**
 * Deduplicate array (case-insensitive for strings)
 */
function dedupeStrings(arr: string[]): string[] {
  const seen = new Set<string>();
  return arr.filter((item) => {
    const lower = item.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
}

/**
 * POST /api/interview/questions
 * Fetch rule-based interview questions based on role or analysis context
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { analysisId, roleTag, level, skills } = body;

    // Validate input: must have either analysisId or roleTag
    if (!analysisId && !roleTag) {
      return NextResponse.json(
        { error: 'Must provide either analysisId or roleTag' },
        { status: 400 }
      );
    }

    let inferredRoleTag: string = roleTag;
    let inferredLevel: 'junior' | 'mid' | 'senior' = level ?? 'mid';
    let focusSkills: string[] = skills ?? [];

    // If analysisId is provided, load and infer from Analysis document
    if (analysisId) {
      await connectDB();

      const analysis = await Analysis.findById(analysisId)
        .populate('jobProfileId', 'jobTitle company seniorityLevel parsed')
        .lean();

      if (!analysis) {
        return NextResponse.json(
          { error: 'Analysis not found' },
          { status: 404 }
        );
      }

      const jobProfile = (analysis as any).jobProfileId;
      const jobTitle = jobProfile?.jobTitle || '';

      // Infer role tag from job title
      inferredRoleTag = inferRoleTagFromJobTitle(jobTitle);

      // Infer level from job title or seniorityLevel field
      if (jobProfile?.seniorityLevel) {
        const seniorityMap: Record<string, 'junior' | 'mid' | 'senior'> = {
          junior: 'junior',
          mid: 'mid',
          senior: 'senior',
          entry: 'junior',
          'entry-level': 'junior',
          graduate: 'junior',
          internship: 'junior',
          intermediate: 'mid',
          staff: 'senior',
          principal: 'senior',
          lead: 'senior',
        };
        const seniorityLower = jobProfile.seniorityLevel.toLowerCase();
        inferredLevel = seniorityMap[seniorityLower] || inferLevelFromJobTitle(jobTitle);
      } else {
        inferredLevel = inferLevelFromJobTitle(jobTitle);
      }

      // Gather focus skills from skill overlap + matched skills
      const missingCore = (analysis as any).skillOverlap?.missingCoreSkills || [];
      const matched = (analysis as any).skillOverlap?.matchedSkills || [];
      const combined = [...missingCore, ...matched];
      focusSkills = dedupeStrings(combined);
    }

    // Validate inferred/provided roleTag
    const validRoles = ['fullstack', 'frontend', 'backend', 'data', 'devops', 'general'];
    if (!validRoles.includes(inferredRoleTag)) {
      return NextResponse.json(
        { error: `Invalid roleTag: ${inferredRoleTag}` },
        { status: 400 }
      );
    }

    // Get questions from the interview bank
    const questions = getQuestionsForRole({
      roleTag: inferredRoleTag as any,
      level: inferredLevel,
      focusSkills,
      limit: 20,
    });

    return NextResponse.json({
      roleTag: inferredRoleTag,
      level: inferredLevel,
      skills: focusSkills,
      questions,
    });
  } catch (error) {
    console.error('❌ Error in /api/interview/questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
