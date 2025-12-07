import { NextRequest, NextResponse } from "next/server";
import { parseJob } from "@/lib/mlClient";
import { connectDB } from "@/lib/db";
import JobProfile from "@/models/JobProfile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
      let { jdText, jdUrl } = body;
      // Normalize empty strings to null
      jdText = jdText && String(jdText).trim() ? String(jdText) : null;
      jdUrl = jdUrl && String(jdUrl).trim() ? String(jdUrl) : null;

    // Validate: at least one input required
    if (!jdText && !jdUrl) {
      return NextResponse.json(
        { error: "Please provide either a job description or job URL." },
        { status: 400 }
      );
    }

    // Call ML service to parse job (only jdText supported server-side)
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

    // Normalize parsed shape to ensure consistent response and DB storage
    const parsed = mlResult.parsed || {};
    const normalized = {
      jobTitle: parsed.jobTitle || parsed.title || "",
      company: parsed.company || null,
      location: parsed.location || null,
      requiredSkills: Array.isArray(parsed.requiredSkills)
        ? parsed.requiredSkills
        : [],
      niceToHaveSkills: Array.isArray(parsed.niceToHaveSkills)
        ? parsed.niceToHaveSkills
        : [],
      seniorityLevel: parsed.seniorityLevel || null,
      responsibilities: Array.isArray(parsed.responsibilities)
        ? parsed.responsibilities
        : [],
    };

    // Connect to MongoDB and save job profile (userId optional)
    await connectDB();
    const jobProfile = new JobProfile({
      userId: null, // TODO: get from session when auth is wired
      sourceType: jdText ? "paste" : "link",
      jobTitle: normalized.jobTitle || "",
      company: normalized.company,
      location: normalized.location,
      rawText: mlResult.rawText || jdText || "",
      parsed: normalized,
    });

    const saved = await jobProfile.save();

    return NextResponse.json({
      jobProfileId: saved._id.toString(),
      parsed: normalized,
    });
  } catch (err: any) {
    console.error("[/api/jobs/parse] Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
