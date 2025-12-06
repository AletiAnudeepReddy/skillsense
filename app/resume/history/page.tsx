"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type StoredResume = {
  resumeId: string;
  parsed: {
    name?: string;
    title?: string;
    skills?: string[];
  };
  createdAt: string;
  sourceType?: string;
};

export default function ResumeHistoryPage() {
  const [resumes, setResumes] = useState<StoredResume[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/resume/history");
        if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
        const data = await res.json();
        if (mounted) {
          setResumes(data?.resumes ?? []);
        }
      } catch (err: any) {
        console.error("Failed to load resume history", err);
        if (mounted) setError(err?.message ?? "Failed to load");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-[60vh] p-6 text-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8" data-aos="fade-up">
          <h1 className="text-3xl font-bold">Resume history</h1>
          <p className="text-slate-400 mt-2">
            Quickly reuse a parsed resume for new job analyses.
          </p>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center">
            <p className="text-slate-300">Loading...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center">
            <p className="text-rose-400">{error}</p>
          </div>
        ) : !resumes || resumes.length === 0 ? (
          <div
            className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center"
            data-aos="zoom-in"
          >
            <p className="text-slate-300">
              You haven’t uploaded any resumes yet. Start by uploading one.
            </p>
            <div className="mt-4">
              <Link href="/resume/upload">
                <Button className="bg-indigo-500 hover:bg-indigo-400">
                  Upload resume
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumes.map((r, idx) => (
              <div
                key={r.resumeId}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-sm hover:-translate-y-0.5 transition"
                data-aos="fade-up"
                data-aos-delay={`${idx * 100}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      {r.parsed?.name ?? r.parsed?.title ?? "Untitled"}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-100">
                      {(r.parsed?.skills ?? []).length} skills
                    </div>
                    <div className="text-xs text-slate-400">
                      {r.sourceType ?? "parsed"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link
                    href={`/resume/upload?use=${r.resumeId}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-indigo-500 hover:bg-indigo-400">
                      Use this resume
                    </Button>
                  </Link>
                  <Button variant="ghost">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
