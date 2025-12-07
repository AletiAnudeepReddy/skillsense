"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type ParsedJob = {
  jobProfileId: string;
  jobTitle: string;
  company?: string | null;
  location?: string | null;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  responsibilities?: string[];
  seniorityLevel?: string | null;
};

export default function TargetJobPage() {
  const [jdText, setJdText] = useState("");
  const [jdUrl, setJdUrl] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedJob, setParsedJob] = useState<ParsedJob | null>(null);

  // Additional states for the analysis flow
  const [parseError, setParseError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Array<{ id: string; label: string }>>(
    []
  );
  const [resumesLoading, setResumesLoading] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const router = useRouter();

  const handleParse = async () => {
    setError(null);
    setParseError(null);

    if (!jdText.trim() && !jdUrl.trim()) {
      setParseError("Please paste a job description or provide a job link.");
      return;
    }

    setIsParsing(true);
    setParsedJob(null);

    try {
      const res = await fetch("/api/jobs/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jdText: jdText.trim() || null,
          jdUrl: jdUrl.trim() || null,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("/api/jobs/parse error:", res.status, text);
        setParseError(text || "Failed to parse job description");
        return;
      }

      const data = await res.json();
      const parsed = data.parsed ?? data;

      const normalized: ParsedJob = {
        jobProfileId: data.jobProfileId || parsed.jobProfileId || "",
        jobTitle: parsed.jobTitle ?? parsed.title ?? "Untitled Role",
        company: parsed.company ?? null,
        location: parsed.location ?? null,
        requiredSkills: parsed.requiredSkills ?? parsed.required_skills ?? [],
        niceToHaveSkills: parsed.niceToHaveSkills ?? parsed.nice_to_have ?? [],
        responsibilities: parsed.responsibilities ?? [],
        seniorityLevel: parsed.seniorityLevel ?? parsed.seniority_level ?? null,
      };

      setParsedJob(normalized);

      // Load resumes after a successful parse
      if (!resumes.length) {
        loadResumes();
      }
    } catch (err: any) {
      console.error("Error calling /api/jobs/parse", err);
      setParseError(err?.message || "An error occurred while parsing the job.");
    } finally {
      setIsParsing(false);
    }
  };

  async function loadResumes() {
    setResumesLoading(true);
    try {
      const res = await fetch("/api/resume/history");
      if (!res.ok) {
        const txt = await res.text();
        console.error("/api/resume/history failed:", res.status, txt);
        setResumes([]);
        return;
      }
      const data = await res.json();
      const items = data.items || [];
      const mapped = items.map((it: any) => {
        const labelBase =
          it.parsed?.name || it.parsed?.title || "Untitled resume";
        const created = new Date(it.createdAt).toLocaleDateString();
        return { id: it._id, label: `${labelBase} • ${created}` };
      });
      setResumes(mapped);
      if (mapped.length) setSelectedResumeId(mapped[0].id);
    } catch (err) {
      console.error("Error loading resumes", err);
      setResumes([]);
    } finally {
      setResumesLoading(false);
    }
  }

  async function handleRunAnalysis() {
    setAnalysisError(null);
    if (!parsedJob || !parsedJob.jobProfileId) {
      setAnalysisError("No parsed job available.");
      return;
    }
    if (!selectedResumeId) {
      setAnalysisError("Select a resume to run analysis.");
      return;
    }

    setIsRunningAnalysis(true);
    try {
      const res = await fetch("/api/analysis/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeId: selectedResumeId,
          jobProfileId: parsedJob.jobProfileId,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error("/api/analysis/run failed:", res.status, txt);
        setAnalysisError(txt || "Failed to run analysis");
        return;
      }
      const data = await res.json();
      const analysisId = data.analysisId || data.id;
      if (!analysisId) {
        setAnalysisError("Analysis service returned no id.");
        return;
      }
      router.push(`/analysis/${analysisId}`);
    } catch (err: any) {
      console.error("Error running analysis", err);
      setAnalysisError(err?.message || "Failed to run analysis");
    } finally {
      setIsRunningAnalysis(false);
    }
  }

  return (
    <div className="min-h-[70vh] p-6 text-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold">Choose your target job</h1>
          <p className="text-slate-400 mt-2">
            Paste a job description or link to see how your skills compare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card
              className="bg-slate-900/60 border-2 rounded-2xl shadow-sm border-dashed border-slate-700"
              data-aos="fade-right"
            >
              <div className="p-6">
                <h3 className="text-lg text-slate-300  font-semibold mb-3">
                  Job description
                </h3>
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
                    <Button
                      className="text-slate-300"
                      onClick={() => setJdUrl("")}
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {(parseError || error) && (
                  <div className="mt-4 text-sm text-rose-400">
                    {parseError || error}
                  </div>
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

            <Card
              className="bg-slate-900/60 border-slate-800"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="p-6">
                <h4 className="text-sm text-slate-400 font-semibold mb-2">
                  Tips
                </h4>
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
                    {parsedJob?.seniorityLevel && (
                      <div className="text-sm text-slate-400">
                        Seniority: {parsedJob.seniorityLevel}
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

                  <div>
                    <h4 className="text-sm text-slate-400 mb-2">
                      Responsibilities
                    </h4>
                    <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
                      {(parsedJob?.responsibilities ?? []).map((r, idx) => (
                        <li key={`resp-${idx}`}>{r}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm text-slate-400 mb-2">
                      Compare with your resume
                    </h4>
                    {resumesLoading ? (
                      <div className="text-sm text-slate-400">
                        Loading resumes…
                      </div>
                    ) : resumes.length === 0 ? (
                      <div className="text-sm text-rose-400">
                        No resumes found. Upload one first.
                      </div>
                    ) : (
                      <div className="flex gap-3 items-center">
                        <select
                          value={selectedResumeId}
                          onChange={(e) => setSelectedResumeId(e.target.value)}
                          className="bg-slate-800 text-slate-50 p-2 rounded-md border border-slate-700"
                        >
                          {resumes.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.label}
                            </option>
                          ))}
                        </select>

                        <Button
                          onClick={handleRunAnalysis}
                          disabled={
                            !parsedJob || !selectedResumeId || isRunningAnalysis
                          }
                        >
                          {isRunningAnalysis
                            ? "Running…"
                            : "Run Skill Analysis"}
                        </Button>
                      </div>
                    )}
                    {analysisError && (
                      <div className="text-sm text-rose-400 mt-2">
                        {analysisError}
                      </div>
                    )}
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
