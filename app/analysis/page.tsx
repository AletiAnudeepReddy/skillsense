"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Loader } from "lucide-react";

interface AnalysisItem {
  id: string;
  matchScore: number;
  summary: string;
  createdAt: string;
}

export default function AnalysisListPage() {
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/analysis", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load analyses");
        }

        const result = await response.json();
        setAnalyses(result.analyses || []);
      } catch (err: any) {
        setError(err.message || "Failed to load analyses");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  const getFitStatus = (score: number): string => {
    if (score >= 80) return "Excellent Fit";
    if (score >= 60) return "Good Fit";
    if (score >= 40) return "Average Fit";
    return "Needs Work";
  };

  const getStatusColor = (score: number): string => {
    if (score >= 80) return "from-emerald-400 to-green-400";
    if (score >= 60) return "from-cyan-400 to-blue-400";
    if (score >= 40) return "from-amber-400 to-orange-400";
    return "from-red-400 to-pink-400";
  };

  return (
    <div className="min-h-screen py-6">
      {/* Header */}
      <div className="mb-12" data-aos="fade-down">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-300 mb-3">
          Your Analyses
        </h1>
        <p className="text-slate-300">
          View all your skill match results and track your progress.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center min-h-96">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-slate-300">Loading your analyses...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && analyses.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg mb-6">
            No analyses yet. Run your first analysis to get started!
          </p>
          <Link
            href="/resume/upload"
            className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-xl hover:scale-105 transition"
          >
            Start Analysis →
          </Link>
        </div>
      )}

      {/* Analyses Grid */}
      {!loading && !error && analyses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis, idx) => (
            <Link key={analysis.id} href={`/analysis/${analysis.id}`}>
              <div
                className="group h-full rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {/* Score Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className={`bg-gradient-to-r ${getStatusColor(
                      analysis.matchScore
                    )} bg-clip-text text-transparent`}
                  >
                    <span className="text-3xl font-bold">
                      {analysis.matchScore}%
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition translate-x-0 group-hover:translate-x-1" />
                </div>

                {/* Status */}
                <p
                  className={`text-sm font-semibold mb-3 bg-gradient-to-r ${getStatusColor(
                    analysis.matchScore
                  )} bg-clip-text text-transparent`}
                >
                  {getFitStatus(analysis.matchScore)}
                </p>

                {/* Summary */}
                <p className="text-slate-300 text-sm line-clamp-3 mb-4">
                  {analysis.summary}
                </p>

                {/* Date */}
                <p className="text-xs text-slate-500">
                  {new Date(analysis.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
