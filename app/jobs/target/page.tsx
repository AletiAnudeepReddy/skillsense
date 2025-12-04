"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type ParsedJob = {
  jobTitle: string;
  company?: string;
  location?: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
};

export default function TargetJobPage() {
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedJob, setParsedJob] = useState<ParsedJob | null>(null);

  const handleParse = async () => {
    setError(null);
    if (!jdText.trim() && !jdUrl.trim()) {
      setError("Please paste a job description or provide a job link.");
      return;
    }

    setIsParsing(true);
    setParsedJob(null);

    try {
      const res = await fetch("/api/jobs/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jdText, jdUrl }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to parse job description");
      }

      const data = await res.json();
      // Expected: { parsed: { jobTitle, company, location, requiredSkills, niceToHaveSkills } }
      const parsed = data.parsed ?? data;
      setParsedJob({
        jobTitle: parsed.jobTitle ?? parsed.title ?? "Untitled Role",
        company: parsed.company,
        location: parsed.location,
        requiredSkills: parsed.requiredSkills ?? parsed.required_skills ?? [],
        niceToHaveSkills: parsed.niceToHaveSkills ?? parsed.nice_to_have ?? [],
      });
    } catch (err: any) {
      setError(err?.message || "An error occurred while parsing the job.");
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div className="min-h-[70vh] p-6 text-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Choose your target job</h1>
          <p className="text-slate-400 mt-2">
            Paste a job description or link to see how your skills compare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-slate-900/60 border-2 border-dashed border-slate-700">
              <div className="p-6">
                <h3 className="text-lg text-slate-300  font-semibold mb-3">Job description</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Paste either the full JD text or a job posting link.
                </p>

                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste job description here"
                  className="w-full min-h-[160px] p-3 rounded-md bg-slate-800 text-slate-50 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className="mt-4">
                  <label className="text-sm font-medium text-slate-200">
                    Job link (optional)
                  </label>
                  <div className="flex gap-3 mt-2">
                    <Input
                      placeholder="https://www.linkedin.com/jobs/view/..."
                      value={jdUrl}
                      onChange={(e) => setJdUrl(e.target.value)}
                      className="bg-slate-800/60 text-slate-50 border-slate-700"
                    />
                    <Button className="text-slate-300" onClick={() => setJdUrl("")} variant="ghost">
                      Clear
                    </Button>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 text-sm text-rose-400">{error}</div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <Button
                    onClick={handleParse}
                    className="bg-indigo-500 hover:bg-indigo-400"
                  >
                    Parse job
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-slate-900/60 border-slate-800">
              <div className="p-6">
                <h4 className="text-sm font-semibold mb-2">Tips</h4>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>Paste the full job description for best results.</li>
                  <li>
                    Job links from LinkedIn or company sites are supported.
                  </li>
                  <li>
                    Parsing is done server-side and may take a few seconds.
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          <div>
            <Card className="bg-slate-900/60 border-slate-800 p-6 min-h-[340px]">
              {!parsedJob && !isParsing ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                    JD
                  </div>
                  <p className="text-slate-300 font-medium">
                    No job parsed yet
                  </p>
                  <p className="text-sm text-slate-400 text-center">
                    Paste a job description or a link, then click{" "}
                    <span className="font-semibold text-slate-100">
                      Parse job
                    </span>
                    .
                  </p>
                </div>
              ) : isParsing ? (
                <div className="space-y-4">
                  <div className="h-6 bg-slate-800 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-slate-800 rounded w-1/3 animate-pulse" />
                  <div className="h-3 bg-slate-800 rounded w-full animate-pulse" />
                  <div className="h-3 bg-slate-800 rounded w-5/6 animate-pulse" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-slate-400">Title</h4>
                    <div className="text-lg font-semibold text-slate-100">
                      {parsedJob?.jobTitle}
                    </div>
                    {parsedJob?.company && (
                      <div className="text-sm text-slate-300">
                        {parsedJob.company}
                      </div>
                    )}
                    {parsedJob?.location && (
                      <div className="text-sm text-slate-400">
                        {parsedJob.location}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-400 mb-2">
                      Required skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(parsedJob?.requiredSkills ?? []).map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-emerald-600/20 text-emerald-300 text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm text-slate-400 mb-2">
                      Nice to have
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(parsedJob?.niceToHaveSkills ?? []).map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-amber-600/20 text-amber-300 text-sm"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
