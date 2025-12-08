"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ExternalLink,
  BookOpen,
  Code,
  Target,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

// ============================================================================
// Types
// ============================================================================
type LearningResourceType = "video" | "course" | "article" | "doc" | "tutorial";

interface LearningResource {
  type: LearningResourceType;
  title: string;
  url: string;
  platform?: string;
}

interface SkillPlan {
  skill: string;
  priority: "high" | "medium" | "low";
  suggestedResources: LearningResource[];
  suggestedProjects: string[];
}

interface LearningPlanResponse {
  learningPlanId: string;
  analysisId: string;
  estimatedTimelineWeeks: number;
  plan: SkillPlan[];
}

export default function LearningPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysisId");

  const [data, setData] = useState<LearningPlanResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePlan = async () => {
      try {
        if (!analysisId) {
          setError("Analysis ID is required. Please go back and try again.");
          setLoading(false);
          return;
        }

        setLoading(true);
        setError(null);

        const response = await fetch("/api/analysis/learning-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ analysisId }),
        });

        if (!response.ok) {
          let errorMessage = `Failed to generate plan (${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            // If response isn't JSON, use default message
          }
          throw new Error(errorMessage);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        console.error("[LearningPlanPage] Error:", err);
        setError(
          err.message || "Failed to generate learning plan. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    generatePlan();
  }, [analysisId]);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="rounded-3xl overflow-hidden backdrop-blur-xl border border-rose-800/30 bg-slate-900/60 p-8 max-w-2xl w-full">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-rose-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {error ? "Unable to Generate Plan" : "No Plan Found"}
              </h2>
              <p className="text-slate-300 mb-6">
                {error ||
                  "The learning plan could not be loaded. Please try again."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition"
                >
                  Go Back
                </button>
                <Link
                  href="/analysis"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-semibold rounded-lg hover:shadow-lg transition text-center"
                >
                  Back to Analyses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { estimatedTimelineWeeks, plan, analysisId: currentAnalysisId } = data;

  // Group skills by priority
  const highPrioritySkills = plan.filter((s) => s.priority === "high");
  const mediumPrioritySkills = plan.filter((s) => s.priority === "medium");
  const lowPrioritySkills = plan.filter((s) => s.priority === "low");

  return (
    <div className="min-h-screen p-6 pb-12">
      {/* Header */}
      <div className="mb-12" data-aos="fade-down">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Your Learning Roadmap
        </h1>
        <p className="text-md text-slate-300">
          A personalized plan to master the skills you need for your target
          role.
        </p>
      </div>

      {/* Timeline Card */}
      <div
        className="mb-12 rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-8"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div>
            <h2 className="text-2xl  font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mb-2">
              Estimated Timeline
            </h2>
            <p className="text-slate-300">
              Time to complete this personalized roadmap
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {estimatedTimelineWeeks}
            </div>
            <p className="text-slate-400 mt-2 font-semibold">weeks</p>
          </div>
        </div>
      </div>

      {/* Skills Sections by Priority */}
      <div className="space-y-12">
        {/* High Priority Section */}
        {highPrioritySkills.length > 0 && (
          <div data-aos="fade-up" data-aos-delay="150">
            <h2 className="text-2xl font-bold border-t-2 border-emerald-500/50 pt-6 text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-rose-400 to-red-500 rounded" />
              Core Skills (High Priority)
            </h2>
            <div className="space-y-8">
              {highPrioritySkills.map((skillPlan, idx) => (
                <SkillCard
                  key={skillPlan.skill}
                  skillPlan={skillPlan}
                  delay={200 + idx * 50}
                />
              ))}
            </div>
          </div>
        )}

        {/* Medium Priority Section */}
        {mediumPrioritySkills.length > 0 && (
          <div data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded" />
              Nice-to-Have Skills (Medium Priority)
            </h2>
            <div className="space-y-4">
              {mediumPrioritySkills.map((skillPlan, idx) => (
                <SkillCard
                  key={skillPlan.skill}
                  skillPlan={skillPlan}
                  delay={250 + idx * 50}
                />
              ))}
            </div>
          </div>
        )}

        {/* Low Priority Section */}
        {lowPrioritySkills.length > 0 && (
          <div data-aos="fade-up" data-aos-delay="250">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-gradient-to-b from-blue-400 to-cyan-500 rounded" />
              Bonus Skills (Low Priority)
            </h2>
            <div className="space-y-4">
              {lowPrioritySkills.map((skillPlan, idx) => (
                <SkillCard
                  key={skillPlan.skill}
                  skillPlan={skillPlan}
                  delay={300 + idx * 50}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div
        className="mt-16 rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12 text-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h3 className="text-3xl font-bold text-white mb-3">
          Ready to Start Learning?
        </h3>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
          Follow this roadmap at your own pace. Start with core skills, then
          move to nice-to-have skills as you progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push(`/analysis/${currentAnalysisId}`)}
            className="px-8 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition inline-flex items-center justify-center gap-2"
          >
            <ChevronRight className="w-4 h-4" />
            Back to Analysis
          </button>
          <Link
            href="/dashboard"
            className="px-8 py-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-lg hover:scale-105 transition inline-flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Footer Link */}
      <div
        className="mt-8 text-center pb-12"
        data-aos="fade-up"
        data-aos-delay="450"
      >
        <Link
          href="/analysis"
          className="inline-block text-slate-400 hover:text-slate-200 transition underline underline-offset-4"
        >
          ← View All Analyses
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// Skill Card Component
// ============================================================================
interface SkillCardProps {
  skillPlan: SkillPlan;
  delay: number;
}

function SkillCard({ skillPlan, delay }: SkillCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Skill Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">{skillPlan.skill}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              skillPlan.priority === "high"
                ? "bg-rose-500/15 text-rose-300 border border-rose-400/50"
                : skillPlan.priority === "medium"
                ? "bg-amber-500/15 text-amber-300 border border-amber-400/50"
                : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/50"
            }`}
          >
            {skillPlan.priority === "high" && "Core"}
            {skillPlan.priority === "medium" && "Nice-to-Have"}
            {skillPlan.priority === "low" && "Bonus"}
          </span>
        </div>
        <p className="text-slate-400 text-sm">
          {skillPlan.priority === "high" &&
            "This is essential for the role—prioritize learning this first"}
          {skillPlan.priority === "medium" &&
            "This will help you stand out among other candidates"}
          {skillPlan.priority === "low" &&
            "Additional skill that complements your profile"}
        </p>
      </div>

      {/* Resources Section */}
      {skillPlan.suggestedResources.length > 0 && (
        <div className="mb-6">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <BookOpen className="w-5 h-5 text-blue-400" />
            Learning Resources
          </h4>
          <div className="space-y-2">
            {skillPlan.suggestedResources.map((resource, ridx) => (
              <a
                key={ridx}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:border-cyan-400/50 hover:bg-slate-800/60 transition group"
              >
                <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-200 capitalize flex-shrink-0">
                  {resource.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate group-hover:text-cyan-300 transition">
                    {resource.title}
                  </p>
                  {resource.platform && (
                    <p className="text-xs text-slate-500 mt-0.5">
                      {resource.platform}
                    </p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 flex-shrink-0 transition" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {skillPlan.suggestedProjects.length > 0 && (
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Code className="w-5 h-5 text-indigo-400" />
            Hands-On Projects
          </h4>
          <div className="space-y-2">
            {skillPlan.suggestedProjects.map((project, pidx) => (
              <div
                key={pidx}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/40"
              >
                <Target className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-200 text-sm">{project}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <>
      <div className="mb-8 animate-pulse">
        <div className="h-12 bg-slate-800 rounded-lg w-3/4 mb-3" />
        <div className="h-6 bg-slate-800 rounded-lg w-1/2" />
      </div>

      <div className="space-y-8">
        {/* Timeline Skeleton */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 animate-pulse">
          <div className="h-16 bg-slate-800 rounded-lg w-1/3 mx-auto" />
        </div>

        {/* Skill Plans Skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 animate-pulse"
          >
            <div className="h-8 bg-slate-800 rounded-lg w-1/4 mb-6" />
            <div className="space-y-3 mb-6">
              {[1, 2].map((j) => (
                <div key={j} className="h-12 bg-slate-800 rounded-lg" />
              ))}
            </div>
            <div className="h-20 bg-slate-800 rounded-lg" />
          </div>
        ))}
      </div>
    </>
  );
}
