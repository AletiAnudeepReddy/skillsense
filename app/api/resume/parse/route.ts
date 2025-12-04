import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/mlClient";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileUrl, linkedinUrl } = body;

    // Validate: at least one input required
    if (!fileUrl && !linkedinUrl) {
      return NextResponse.json(
        { error: "Please provide either a file URL or LinkedIn URL." },
        { status: 400 }
      );
    }

    // Call ML service to parse resume
    let mlResult;
    try {
      mlResult = await parseResume({ fileUrl, linkedinUrl });
    } catch (err: any) {
      console.error("[/api/resume/parse] ML service error:", err);
      return NextResponse.json(
        { error: "ML service unavailable or failed to parse resume." },
        { status: 502 }
      );
    }

    // Connect to MongoDB and save resume
    await connectDB();
    const resume = new Resume({
      userId: null, // TODO: get from session when auth is wired
      sourceType: fileUrl ? "pdf" : "linkedin",
      rawText: mlResult.rawText,
      parsed: mlResult.parsed,
      fileUrl,
      linkedinUrl,
      createdAt: new Date(),
    });

    const saved = await resume.save();

    return NextResponse.json({
      resumeId: saved._id.toString(),
      parsed: mlResult.parsed,
    });
  } catch (err: any) {
    console.error("[/api/resume/parse] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
