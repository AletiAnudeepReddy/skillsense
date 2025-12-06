import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Parse multipart form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided. Please upload a PDF." },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file." },
        { status: 400 }
      );
    }

    // Read file into buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (buffer.length === 0) {
      return NextResponse.json(
        { error: "File is empty. Please upload a valid PDF." },
        { status: 400 }
      );
    }

    // Extract text using pdf-parse
    try {
      const pdf = require("pdf-parse/lib/pdf-parse.js");
      const data = await pdf(buffer);

      // Get text from all pages
      const rawText = data.text || "";

      if (!rawText.trim()) {
        return NextResponse.json(
          {
            error:
              "Could not extract text from PDF. The PDF may be scanned or encrypted. Please try another file or paste your resume text.",
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        rawText: rawText.trim(),
      });
    } catch (pdfError: any) {
      console.error("[/api/resume/parse-file] PDF parsing error:", pdfError);
      return NextResponse.json(
        {
          error:
            "Failed to parse PDF. The file may be corrupted. Please try another file.",
        },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("[/api/resume/parse-file] Error:", err);
    return NextResponse.json(
      { error: "Internal server error while processing file." },
      { status: 500 }
    );
  }
}
