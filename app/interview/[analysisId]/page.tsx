"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import type { InterviewQuestion } from "@/lib/interviewBank";
import { ChevronDown, Copy, ArrowLeft } from "lucide-react";

interface QuestionCardProps {
  question: InterviewQuestion;
  index: number;
}

function QuestionCard({ question, index }: QuestionCardProps) {
  const [hintVisible, setHintVisible] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "system_design":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "behavioral":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "culture":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-500/30";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "junior":
        return "text-emerald-400";
      case "mid":
        return "text-amber-400";
      case "senior":
        return "text-rose-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div
      key={question.id}
      className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 hover:bg-slate-800/80 hover:border-slate-600/80 transition-all shadow-lg"
      data-aos="fade-up"
      data-aos-delay={`${index * 60}`}
    >
      {/* Header with badges */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getCategoryColor(
              question.category
            )}`}
          >
            {question.category.replace("_", " ")}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border border-slate-600 ${getLevelColor(
              question.level
            )}`}
          >
            {question.level.charAt(0).toUpperCase() + question.level.slice(1)}
          </span>
        </div>
      </div>

      {/* Question text */}
      <h3 className="text-lg font-medium text-slate-100 mb-4 leading-relaxed">
        {question.question}
      </h3>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {question.skillTags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hint section */}
      {question.hint && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <button
            onClick={() => setHintVisible(!hintVisible)}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-slate-300 transition-colors"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                hintVisible ? "rotate-180" : ""
              }`}
            />
            {hintVisible ? "Hide hint" : "Show hint"}
          </button>

          {hintVisible && (
            <div className="mt-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <p className="text-sm text-slate-300">{question.hint}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-slate-900/70 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 animate-pulse">
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-24 bg-slate-700/50 rounded-full" />
        <div className="h-6 w-20 bg-slate-700/50 rounded-full" />
      </div>
      <div className="h-6 bg-slate-700/50 rounded mb-3" />
      <div className="h-4 bg-slate-700/50 rounded w-3/4 mb-4" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-slate-700/50 rounded-lg" />
        <div className="h-5 w-20 bg-slate-700/50 rounded-lg" />
        <div className="h-5 w-14 bg-slate-700/50 rounded-lg" />
      </div>
    </div>
  );
}

export default function InterviewPage({
  params,
}: {
  params: { analysisId: string };
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [meta, setMeta] = useState<{
    roleTag: string;
    level: string;
    skills: string[];
  } | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/interview/questions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ analysisId: params.analysisId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch questions");
        }

        const data = await response.json();
        setMeta({
          roleTag: data.roleTag,
          level: data.level,
          skills: data.skills || [],
        });
        setQuestions(data.questions || []);
      } catch (err) {
        console.error("Error fetching interview questions:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [params.analysisId]);

  const copyAllQuestions = async () => {
    const text = questions
      .map(
        (q, i) => `${i + 1}. ${q.question}\n${q.hint ? `Hint: ${q.hint}` : ""}`
      )
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(text);
      alert("Questions copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      alert("Failed to copy questions");
    }
  };

  const getRoleIcon = (roleTag: string) => {
    const icons: Record<string, string> = {
      fullstack: "🏗️",
      frontend: "🎨",
      backend: "⚙️",
      data: "📊",
      devops: "🚀",
      general: "💡",
    };
    return icons[roleTag] || "💼";
  };

  return (
    <MainLayout>
      {/* Back button */}
      <Link
        href={`/analysis/${params.analysisId}`}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors mb-8"
        data-aos="fade-down"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Analysis
      </Link>

      {/* Header */}
      <section className="mb-12" data-aos="fade-up">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{meta && getRoleIcon(meta.roleTag)}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            Interview Prep for this Role
          </h1>
        </div>
        <p className="text-slate-400 text-md mt-2">
          {meta
            ? `Tailored ${meta.level} level questions for ${meta.roleTag} position`
            : "Loading interview prep questions..."}
        </p>
      </section>

      {/* Role metadata chips */}
      {meta && !loading && (
        <div
          className="mb-10 p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-700/50"
          data-aos="zoom-in"
        >
          <div className="space-y-4">
            {/* Role tag */}
            <div>
              <p className="text-sm font-medium text-slate-400 mb-2">Role</p>
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-medium">
                  {meta.roleTag.charAt(0).toUpperCase() + meta.roleTag.slice(1)}
                </span>
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="text-sm font-medium text-slate-400 mb-2">
                Experience Level
              </p>
              <div className="inline-block">
                <span
                  className={`px-4 py-2 rounded-full font-medium border ${
                    meta.level === "junior"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : meta.level === "mid"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  }`}
                >
                  {meta.level.charAt(0).toUpperCase() + meta.level.slice(1)}
                </span>
              </div>
            </div>

            {/* Key skills */}
            {meta.skills.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-400 mb-2">
                  Key Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {meta.skills.slice(0, 5).map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                  {meta.skills.length > 5 && (
                    <span className="px-3 py-1 text-slate-400 text-sm">
                      +{meta.skills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div
          className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 mb-8"
          data-aos="shake"
        >
          <p className="text-rose-300 font-medium">⚠️ {error}</p>
          <p className="text-rose-400/80 text-sm mt-2">
            Please check the analysis ID and try again.
          </p>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="space-y-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Questions list */}
      {!loading && !error && questions.length > 0 && (
        <>
          {/* Toolbar */}
          <div
            className="flex justify-between items-center mb-8"
            data-aos="fade-up"
          >
            <h2 className="text-xl font-bold text-slate-100">
              {questions.length} Interview Questions
            </h2>
            <button
              onClick={copyAllQuestions}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 transition-all font-medium"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </button>
          </div>

          {/* Questions grid */}
          <div className="space-y-6 mb-12">
            {questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <div
            className="text-center py-12 border-t border-slate-700/50"
            data-aos="fade-up"
          >
            <p className="text-slate-400 mb-4">Ready to practice?</p>
            <Link href={`/analysis/${params.analysisId}`}>
              <Button>Back to Analysis</Button>
            </Link>
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && !error && questions.length === 0 && (
        <div className="text-center py-12" data-aos="fade-up">
          <p className="text-slate-400 text-lg">
            No questions found for this role.
          </p>
          <Link
            href={`/analysis/${params.analysisId}`}
            className="mt-4 inline-block"
          >
            <Button>Back to Analysis</Button>
          </Link>
        </div>
      )}
    </MainLayout>
  );
}
