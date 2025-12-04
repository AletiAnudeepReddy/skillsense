"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ParsedResume = {
  name?: string;
  title?: string;
  summary?: string;
  skills: string[];
};

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ParsedResume | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const f = e.target.files?.[0] ?? null;
    if (f && f.type !== "application/pdf") {
      setError("Please upload a PDF file for now.");
      setFile(null);
      setFileUrl(null);
      return;
    }
    setFile(f);
    if (f) {
      // For now use an object URL as a placeholder fileUrl
      const url = URL.createObjectURL(f);
      setFileUrl(url);
    } else {
      setFileUrl(null);
    }
  };

  const handleParse = async () => {
    setError(null);
    if (!fileUrl && !linkedinUrl) {
      setError("Please provide a PDF file or a LinkedIn URL.");
      return;
    }

    setIsParsing(true);
    setParsed(null);

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl, linkedinUrl }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to parse resume");
      }

      const data = await res.json();
      // Expected shape: { parsed: { name, title, summary, skills } }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Upload your resume</h1>
          <p className="text-slate-400 mt-2">
            Upload a PDF or paste your LinkedIn URL to let SkillMatch AI parse
            your profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: upload controls */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-slate-900/60 border-2 border-dashed border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Upload PDF</h3>
              <p className="text-sm text-slate-400 mb-4">
                We currently accept PDFs. Upload your resume to parse skills and
                summary.
              </p>

              <label className="flex items-center gap-3">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={onFileChange}
                  className="hidden"
                  id="resume-file"
                />
                <label
                  htmlFor="resume-file"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 cursor-pointer border border-slate-700"
                >
                  <ArrowUp className="w-4 h-4 text-slate-200" />
                  <span className="text-sm text-slate-100">Choose PDF</span>
                </label>
                <span className="text-sm text-slate-400">{file?.name}</span>
              </label>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">LinkedIn URL</h4>
                <div className="flex gap-3">
                  <Input
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="bg-slate-800/60 text-slate-50 border-slate-700"
                  />
                  <Button onClick={() => setLinkedinUrl("")} variant="ghost">
                    Clear
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button
                  onClick={handleParse}
                  className="bg-indigo-500 hover:bg-indigo-400"
                >
                  Parse resume
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
            </div>

            <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>Use a clean PDF for best parsing results.</li>
                <li>Pasting a LinkedIn URL can help extract recent roles.</li>
                <li>You can re-use parsed resumes from history.</li>
              </ul>
            </div>
          </div>

          {/* Right: preview card */}
          <div>
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
                    Upload a PDF or paste a LinkedIn URL and click{" "}
                    <span className="font-semibold text-slate-100">
                      Parse resume
                    </span>
                    .
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
                <div className="space-y-4">
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
