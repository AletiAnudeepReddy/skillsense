import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/db';
import { Analysis } from '@/models/Analysis';
import { Types } from 'mongoose';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/**
 * GET /api/analysis/[analysisId]
 * Fetches a single analysis result by ID
 */
export async function GET(
  _: unknown,
  { params }: { params: { analysisId: string } }
) {
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

    const { analysisId } = params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(analysisId)) {
      return NextResponse.json(
        { error: 'Invalid analysis ID format' },
        { status: 400 }
      );
    }

    await connectDB();

    const analysis = await Analysis.findById(analysisId).lean();

    if (!analysis) {
      return NextResponse.json(
        { error: 'Analysis not found' },
        { status: 404 }
      );
    }

    // Verify ownership
    if (analysis.userId?.toString() !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      {
        analysisId: analysis._id?.toString(),
        matchScore: analysis.matchScore,
        skillOverlap: analysis.skillOverlap,
        summary: analysis.summary,
        recommendedNextSteps: analysis.recommendedNextSteps,
        createdAt: analysis.createdAt,
        resumeId: analysis.resumeId?.toString(),
        jobProfileId: analysis.jobProfileId?.toString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[GET /api/analysis/[analysisId]]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
