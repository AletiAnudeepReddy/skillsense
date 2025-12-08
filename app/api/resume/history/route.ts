import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
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

    // Return latest 20 resumes for current user
    const docs = await Resume.find({ userId }).sort({ createdAt: -1 }).limit(20).lean();

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
