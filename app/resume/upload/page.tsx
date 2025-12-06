"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";
import Link from "next/link";
import { ArrowUp, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ParsedResume = {
  name?: string;
  title?: string;
  summary?: string;
  skills: string[];
  experience?: Array<{
    company: string;
    role: string;
    startDate?: string;
    endDate?: string;
    technologies?: string[];
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    year?: string;
  }>;
};

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [rawText, setRawText] = useState<string>("");
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedResume | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (f && f.type !== "application/pdf") {
      setError("Please upload a PDF file for now.");
      setFile(null);
      setFileUrl(null);
      setRawText("");
      return;
    }
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setFileUrl(url);
      // Extract text from PDF
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((item: any) => item.str).join(" ") + "\n";
        }
        setRawText(text);
      } catch (err) {
        setError(
          "Failed to extract text from PDF. Try another file or paste your resume text."
        );
        setRawText("");
      }
    } else {
      setFileUrl(null);
      setRawText("");
    }
  };

  const handleParse = async () => {
    setError(null);

    // Allow either pasted text or file upload
    if (!rawText.trim() && !fileUrl) {
      setError("Please paste your resume text or upload a file.");
      return;
    }

    setIsParsing(true);
    setParsed(null);

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: rawText.trim() || null,
          linkedinUrl: linkedinUrl || null,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to parse resume");
      }

      const data = await res.json();
      setParsed(data.parsed ?? data);
    } catch (err: any) {
      setError(err?.message || "An error occurred while parsing.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="min-h-[70vh] p-6 text-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold">Upload your resume</h1>
          <p className="text-slate-400 mt-2">
            Upload a PDF or paste your LinkedIn URL to let SkillMatch AI parse
            your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: upload controls */}
          <div className="space-y-6">
            <div
              className="rounded-2xl bg-slate-900/60 border-2 border-dashed border-slate-700 p-6 shadow-sm"
              data-aos="fade-right"
            >
              <h3 className="text-lg font-semibold mb-3">Paste your resume</h3>
              <p className="text-sm text-slate-400 mb-4">
                Copy and paste your resume text below. We'll parse it to extract
                skills, experience, and education.
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">
                  Upload resume file (PDF, DOC, DOCX)
                </h4>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={onFileChange}
                    className="hidden"
                    id="resume-file"
                  />
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700">
                    <ArrowUp className="w-4 h-4 text-slate-200" />
                    <span className="text-sm text-slate-100">Choose file</span>
                  </span>
                  <span className="text-sm text-slate-400">
                    {file?.name || "No file selected"}
                  </span>
                </label>
                <div className="text-xs text-slate-500 mt-1">
                  {fileUrl
                    ? "You can now parse your resume using the uploaded file."
                    : "Uploading is optional. You can also paste your resume text below."}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Resume text</h4>
                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="Paste plain text from your resume or LinkedIn profile here..."
                  className="w-full min-h-[200px] rounded-md bg-slate-800/60 text-slate-50 p-3 text-sm border border-slate-700 resize-vertical focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button
                  onClick={handleParse}
                  disabled={isParsing}
                  className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50"
                >
                  {isParsing ? "Parsing..." : "Parse resume"}
                </Button>
                <Link
                  href="/resume/history"
                  className="text-sm text-slate-300 hover:text-white"
                >
                  View previous resumes
                </Link>
              </div>

              {error && (
                <div className="mt-4 text-sm text-rose-400">{error}</div>
              )}

              <div className="mt-6 p-4 bg-slate-800/30 rounded-md border border-slate-700">
                <p className="text-xs text-slate-400">
                  💡 <strong>Coming soon:</strong> PDF upload and LinkedIn
                  direct import will be available in a future update. For now,
                  please copy and paste your resume text.
                </p>
              </div>
            </div>

            <div
              className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-sm"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>Use a clean PDF for best parsing results.</li>
                <li>Pasting a LinkedIn URL can help extract recent roles.</li>
                <li>You can re-use parsed resumes from history.</li>
              </ul>
            </div>
          </div>

          {/* Right: preview card */}
          <div data-aos="fade-left">
            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-sm min-h-[220px] flex flex-col justify-between">
              {!parsed && !isParsing ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    <LinkIcon className="w-8 h-8" />
                  </div>
                  <p className="text-slate-300 font-medium">
                    No resume parsed yet
                  </p>
                  <p className="text-sm text-slate-400 text-center">
                    Paste your resume text on the left and click{" "}
                    <span className="font-semibold text-slate-100">
                      Parse resume
                    </span>{" "}
                    to get started.
                  </p>
                </div>
              ) : isParsing ? (
                <div className="space-y-4">
                  <div className="h-6 bg-slate-800 rounded w-1/3 animate-pulse" />
                  <div className="h-4 bg-slate-800 rounded w-2/3 animate-pulse" />
                  <div className="h-3 bg-slate-800 rounded w-full animate-pulse" />
                  <div className="h-3 bg-slate-800 rounded w-5/6 animate-pulse" />
                </div>
              ) : (
                <div className="space-y-4" data-aos="zoom-in">
                  <div>
                    <h4 className="text-sm text-slate-400">Name</h4>
                    <div className="text-lg font-semibold text-slate-100">
                      {parsed?.name ?? "—"}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-400">Title</h4>
                    <div className="text-sm text-slate-200">
                      {parsed?.title ?? "—"}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-400">Summary</h4>
                    <p className="text-sm text-slate-300">
                      {parsed?.summary ?? "—"}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-400 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {(parsed?.skills ?? []).map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 text-sm hover:shadow-lg transition"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
