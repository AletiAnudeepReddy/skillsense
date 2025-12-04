"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type StoredResume = {
  id: string;
  name?: string;
  createdAt: string;
  skills: string[];
};

const mockResumes: StoredResume[] = [
  {
    id: "1",
    name: "Anudeep Reddy - React Engineer",
    createdAt: new Date().toISOString(),
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    name: "Maria Gomez - Data Scientist",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    skills: ["Python", "Pandas", "NLP"],
  },
];

export default function ResumeHistoryPage() {
  // TODO: replace mock data with fetch to GET /api/resume/history

  return (
    <div className="min-h-[60vh] p-6 text-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Resume history</h1>
          <p className="text-slate-400 mt-2">
            Quickly reuse a parsed resume for new job analyses.
          </p>
        </div>

        {mockResumes.length === 0 ? (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-8 text-center">
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
            {mockResumes.map((r) => (
              <div
                key={r.id}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-sm hover:-translate-y-0.5 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-100">
                      {r.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {new Date(r.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-100">
                      {r.skills.length} skills
                    </div>
                    <div className="text-xs text-slate-400">parsed</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <Link href={`/resume/upload?use=${r.id}`} className="flex-1">
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
