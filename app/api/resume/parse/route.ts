import { NextRequest, NextResponse } from "next/server";
import { parseResume } from "@/lib/mlClient";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";

// IMPORTANT: we use Node.js runtime (needed for Mongoose)
export const runtime = "nodejs";
// Ensure dynamic so it doesn't try to cache
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // For now we ONLY support JSON (rawText). If it's form-data, stop early.
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          error:
            "This endpoint currently expects JSON. Please send { rawText } as JSON (paste-mode) instead of FormData/file upload.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { rawText } = body || {};

    // Validate input from frontend - only rawText required
    if (!rawText || !rawText.trim()) {
      return NextResponse.json(
        {
          error: "Please paste your resume text.",
        },
        { status: 400 }
      );
    }

    // Call ML service with rawText
    let mlResult;
    try {
      mlResult = await parseResume({
        rawText: rawText.trim(),
      });
    } catch (err: any) {
      console.error("[/api/resume/parse] ML service error:", err);
      return NextResponse.json(
        { error: "ML service unavailable or failed to parse resume." },
        { status: 502 }
      );
    }

    // Guard: mlResult must have non-empty rawText before writing to DB
    if (!mlResult?.rawText || !mlResult.rawText.trim()) {
      console.warn(
        "[/api/resume/parse] Empty rawText from ML. No text extracted from file or input."
      );
      return NextResponse.json(
        {
          error:
            "Could not extract text from resume. Please try a different file or paste your resume text.",
        },
        { status: 400 }
      );
    }

    // Save to MongoDB
    await connectDB();

    const resume = new Resume({
      userId: null, // TODO: from session later
      sourceType: "upload", // sourceType enum only allows 'upload' or 'linkedin'
      rawText: mlResult.rawText,
      parsed: mlResult.parsed,
      createdAt: new Date(),
    });

    const saved = await resume.save();

    return NextResponse.json({
      resumeId: saved._id.toString(),
      parsed: mlResult.parsed,
    });
  } catch (err: any) {
    console.error("[/api/resume/parse] Error in route:", err);
    return NextResponse.json(
      { error: "Internal server error in /api/resume/parse" },
      { status: 500 }
    );
  }
}
