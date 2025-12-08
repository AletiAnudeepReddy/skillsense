import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import { Analysis } from "@/models/Analysis";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET /api/analysis
 * Fetches all analyses for the current user
 */
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    const userId = (session?.user as any)?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Not authenticated. Please log in." },
        { status: 401 }
      );
    }

    await connectDB();

    const analyses = await Analysis.find({ userId })
      .select("matchScore summary createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        analyses: analyses.map((a) => ({
          id: a._id.toString(),
          matchScore: a.matchScore,
          summary: a.summary,
          createdAt: a.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[GET /api/analysis]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
