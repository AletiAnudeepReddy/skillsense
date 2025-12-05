import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Analysis } from "@/models/Analysis";

/**
 * GET /api/analysis
 * Fetches all analyses for the current user
 * For now, returns all analyses (auth will be added later)
 */
export async function GET() {
  try {
    await connectDB();

    const analyses = await Analysis.find()
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
