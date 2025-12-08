"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface SkillOverlap {
  matchedSkills: string[];
  missingCoreSkills: string[];
  missingNiceToHaveSkills: string[];
  extraSkills: string[];
}

interface AnalysisData {
  matchScore: number;
  skillOverlap: SkillOverlap;
  summary: string;
}

export default function AnalysisPage() {
  const params = useParams();
  const analysisId = params.analysisId as string;
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analysis/${analysisId}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to load analysis: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to load analysis");
      } finally {
        setLoading(false);
      }
    };

    if (analysisId) {
      fetchAnalysis();
    }
  }, [analysisId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <p className="text-red-400 text-lg mb-4">
          {error || "Analysis not found"}
        </p>
        <Link
          href="/analysis"
          className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold rounded-lg hover:shadow-lg transition"
        >
          Back to Analyses
        </Link>
      </div>
    );
  }

  const { matchScore, skillOverlap, summary } = data;
  const fitStatus = getFitStatus(matchScore);
  const missingSkills = [
    ...skillOverlap.missingCoreSkills.map((s) => ({ skill: s, type: "core" })),
    ...skillOverlap.missingNiceToHaveSkills.map((s) => ({
      skill: s,
      type: "nice",
    })),
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-12 p-6" data-aos="fade-down">
        <h1 className="text-xl sm:text-3xl font-bold text-white mb-3">
          Your Skill Match Result
        </h1>
        <p className="text-md text-slate-300">
          Based on your resume vs the selected job description.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-12 px-6">
        {/* Match Score Hero Card */}
        <div
          className="relative group rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-8 sm:p-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* Animated gradient border effect */}
          <div
            className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 opacity-75 group-hover:opacity-100 transition-opacity -z-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(52, 211, 153), rgb(34, 211, 238), rgb(99, 102, 241))",
            }}
          />
          <div className="relative">
            <div className="text-center mb-6">
              <div className="mb-4">
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-emerald-900 via-cyan-900 to-indigo-900 bg-clip-text text-transparent">
                  {matchScore}%
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                {fitStatus}
              </h2>
              <p className="text-slate-700 text-md max-w-2xl mx-auto">
                {summary}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 shadow-xl rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${matchScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Skill Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 pt-6 gap-8">
          {/* Strong Skills */}
          <div data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded" />
              Strong Skills
            </h3>
            <div className="space-y-3">
              {skillOverlap.matchedSkills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skillOverlap.matchedSkills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-full bg-slate-900/80 border border-emerald-400/30 text-emerald-200 text-sm font-medium hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all"
                    >
                      ✓ {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No matched skills yet.</p>
              )}
            </div>
          </div>

          {/* Skills to Improve */}
          <div data-aos="fade-up" data-aos-delay="300">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded" />
              Skills to Improve
            </h3>
            <div className="space-y-3">
              {missingSkills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {missingSkills.map(({ skill, type }) => (
                    <div
                      key={skill}
                      className="px-4 py-2 rounded-full bg-slate-900/80 border border-amber-400/40 text-amber-200 text-sm font-medium hover:border-amber-400/70 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-all flex items-center gap-2"
                    >
                      <span>⚡ {skill}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          type === "core"
                            ? "bg-red-500/20 text-red-200"
                            : "bg-blue-500/20 text-blue-200"
                        }`}
                      >
                        {type === "core" ? "High Impact" : "Bonus"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No skills to improve!</p>
              )}
            </div>
          </div>
        </div>

        {/* Extra Skills Section */}
        {skillOverlap.extraSkills.length > 0 && (
          <div
            className="rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/40 p-8"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-blue-400 rounded" />
              Bonus Skills You Have
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillOverlap.extraSkills.map((skill) => (
                <div
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-slate-800/60 border border-cyan-400/20 text-cyan-200 text-sm hover:border-cyan-400/50 transition-all"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Grid - Learning Plan & Interview Prep */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
          {/* Interview Prep CTA */}
          <div
            className="relative group rounded-3xl overflow-hidden backdrop-blur-xl p-8 sm:p-12 text-center"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(102, 51, 153), rgb(168, 85, 247), rgb(34, 211, 238))",
              }}
            />
            <div className="relative bg-slate-900/80 rounded-3xl p-8 sm:p-12">
              <h3 className="text-3xl font-bold text-white mb-3">
                Practice Interview Questions
              </h3>
              <p className="text-slate-300 mb-8">
                Get role-specific interview questions tailored to this job and
                your skill gaps.
              </p>
              <Link
                href={`/interview/${analysisId}`}
                className="inline-block px-8 py-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-slate-950 font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(102,51,153,0.6)] transition-all duration-300"
              >
                Start Interview Prep →
              </Link>
            </div>
          </div>

          {/* Learning Plan CTA */}
          <div
            className="relative group rounded-3xl overflow-hidden backdrop-blur-xl p-8 sm:p-12 text-center"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            {/* Gradient border */}
            <div
              className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(52, 211, 153), rgb(34, 211, 238), rgb(99, 102, 241))",
              }}
            />
            <div className="relative bg-slate-900/80 rounded-3xl p-8 sm:p-12">
              <h3 className="text-3xl font-bold text-white mb-3">
                Turn This Into a Learning Plan
              </h3>
              <p className="text-slate-300 mb-8">
                Get a personalized roadmap to master the skills you need for
                this role.
              </p>
              <Link
                href={`/learning-plan?analysisId=${analysisId}`}
                className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(52,211,153,0.6)] transition-all duration-300"
              >
                Generate Learning Plan →
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}

        {/* Footer Link */}
        <div
          className="text-center pb-20"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Link
            href="/analysis"
            className="inline-block text-slate-400 hover:text-slate-200 transition underline underline-offset-4"
          >
            ← Back to Analyses
          </Link>
        </div>
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <>
      <div className="mb-8 animate-pulse">
        <div className="h-12 bg-slate-800 rounded-lg w-3/4 mb-3" />
        <div className="h-6 bg-slate-800 rounded-lg w-1/2" />
      </div>

      <div className="space-y-12">
        {/* Hero Skeleton */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 animate-pulse">
          <div className="h-20 bg-slate-800 rounded-lg mb-6 w-48 mx-auto" />
          <div className="h-8 bg-slate-800 rounded-lg mb-6 w-64 mx-auto" />
          <div className="h-3 bg-slate-800 rounded-full w-full" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-3 animate-pulse">
            <div className="h-8 bg-slate-800 rounded-lg w-1/3 mb-4" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-slate-800 rounded-full w-24" />
              ))}
            </div>
          </div>
          <div className="space-y-3 animate-pulse">
            <div className="h-8 bg-slate-800 rounded-lg w-1/3 mb-4" />
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-slate-800 rounded-full w-24" />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 animate-pulse">
          <div className="h-10 bg-slate-800 rounded-lg mb-4 w-1/2 mx-auto" />
          <div className="h-6 bg-slate-800 rounded-lg mb-6 w-2/3 mx-auto" />
          <div className="h-12 bg-slate-800 rounded-lg w-48 mx-auto" />
        </div>
      </div>
    </>
  );
}

function getFitStatus(score: number): string {
  if (score >= 80) return "Excellent Fit";
  if (score >= 60) return "Good Fit";
  if (score >= 40) return "Average Fit";
  return "Needs Work";
}
