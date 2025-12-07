import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Return latest 20 resumes (no auth yet)
    const docs = await Resume.find({}).sort({ createdAt: -1 }).limit(20).lean();

    const payload = docs.map((d: any) => ({
      _id: d._id?.toString(),
      parsed: d.parsed,
      createdAt: d.createdAt,
      sourceType: d.sourceType,
    }));

    // Return as `items` to match frontend expectations
    return NextResponse.json({ items: payload });
  } catch (err: any) {
    console.error("[/api/resume/history] Error:", err);
    return NextResponse.json({ error: "Failed to fetch resume history" }, { status: 500 });
  }
}
