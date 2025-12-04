import { NextRequest, NextResponse } from "next/server";
import { parseJob } from "@/lib/mlClient";
import { connectDB } from "@/lib/db";
import JobProfile from "@/models/JobProfile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { jdText, jdUrl } = body;

    // Validate: at least one input required
    if (!jdText && !jdUrl) {
      return NextResponse.json(
        { error: "Please provide either a job description or job URL." },
        { status: 400 }
      );
    }

    // Call ML service to parse job
    let mlResult;
    try {
      mlResult = await parseJob({ jdText, jdUrl });
    } catch (err: any) {
      console.error("[/api/jobs/parse] ML service error:", err);
      return NextResponse.json(
        { error: "ML service unavailable or failed to parse job." },
        { status: 502 }
      );
    }

    // Connect to MongoDB and save job profile
    await connectDB();
    const jobProfile = new JobProfile({
      userId: null, // TODO: get from session when auth is wired
      rawText: mlResult.rawText,
      parsed: mlResult.parsed,
      sourceUrl: jdUrl,
      createdAt: new Date(),
    });

    const saved = await jobProfile.save();

    return NextResponse.json({
      jobProfileId: saved._id.toString(),
      parsed: mlResult.parsed,
    });
  } catch (err: any) {
    console.error("[/api/jobs/parse] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
