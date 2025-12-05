"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ExternalLink, BookOpen, Code, Target } from "lucide-react";

interface LearningResource {
  type: string;
  title: string;
  url: string;
  platform?: string;
}

interface SkillPlan {
  skill: string;
  priority: string;
  suggestedResources: LearningResource[];
  suggestedProjects: string[];
}

interface LearningPlanData {
  planId: string;
  estimatedTimelineWeeks: number;
  plan: SkillPlan[];
}

export default function LearningPlanPage() {
  const searchParams = useSearchParams();
  const analysisId = searchParams.get("analysisId");

  const [data, setData] = useState<LearningPlanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generatePlan = async () => {
      try {
        if (!analysisId) {
          throw new Error("analysisId is required");
        }

        setLoading(true);
        const response = await fetch("/api/analysis/learning-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ analysisId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || `Failed to generate plan: ${response.status}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "Failed to generate learning plan");
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
      <div className="flex flex-col items-center justify-center min-h-96">
        <p className="text-red-400 text-lg mb-4">
          {error || "Failed to load learning plan"}
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

  const { estimatedTimelineWeeks, plan } = data;

  return (
    <>
      {/* Header */}
      <div className="mb-12" data-aos="fade-down">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
          Your Learning Roadmap
        </h1>
        <p className="text-xl text-slate-300">
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Estimated Timeline
            </h2>
            <p className="text-slate-300">
              Complete this plan at a steady pace
            </p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              {estimatedTimelineWeeks}
            </div>
            <p className="text-slate-400 mt-2">weeks</p>
          </div>
        </div>
      </div>

      {/* Skills Plan Grid */}
      <div className="space-y-8">
        {plan.map((skillPlan, idx) => (
          <div
            key={skillPlan.skill}
            className="rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-8"
            data-aos="fade-up"
            data-aos-delay={100 + idx * 100}
          >
            {/* Skill Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {skillPlan.skill}
                </h3>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    skillPlan.priority === "high"
                      ? "bg-red-500/20 text-red-200"
                      : skillPlan.priority === "medium"
                      ? "bg-amber-500/20 text-amber-200"
                      : "bg-blue-500/20 text-blue-200"
                  }`}
                >
                  {skillPlan.priority.charAt(0).toUpperCase() +
                    skillPlan.priority.slice(1)}{" "}
                  Priority
                </span>
              </div>
              <p className="text-slate-400">
                {skillPlan.priority === "high"
                  ? "This is a core skill required for the role"
                  : "This is a nice-to-have skill that will give you an edge"}
              </p>
            </div>

            {/* Resources Section */}
            {skillPlan.suggestedResources.length > 0 && (
              <div className="mb-8">
                <h4 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  Learning Resources
                </h4>
                <div className="space-y-3">
                  {skillPlan.suggestedResources.map((resource, ridx) => (
                    <a
                      key={ridx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg bg-slate-800/40 border border-slate-700/40 hover:border-cyan-400/50 hover:bg-slate-800/60 transition"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-cyan-500/20 text-cyan-200 capitalize">
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-white truncate">
                          {resource.title}
                        </h5>
                        {resource.platform && (
                          <p className="text-sm text-slate-400 mt-1">
                            {resource.platform}
                          </p>
                        )}
                      </div>
                      <ExternalLink className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
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
                <div className="space-y-3">
                  {skillPlan.suggestedProjects.map((project, pidx) => (
                    <div
                      key={pidx}
                      className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/40 border border-slate-700/40"
                    >
                      <Target className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-200">{project}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div
        className="mt-12 rounded-3xl overflow-hidden backdrop-blur-xl border border-slate-800 bg-slate-900/60 p-8 text-center"
        data-aos="fade-up"
        data-aos-delay={100 + plan.length * 100}
      >
        <h3 className="text-2xl font-bold text-white mb-3">
          Ready to Get Started?
        </h3>
        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Follow this roadmap at your own pace. Start with high-priority skills,
          then move to medium-priority items as you progress.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/analysis"
            className="inline-block px-8 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:bg-slate-700 transition"
          >
            View All Analyses
          </Link>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 font-bold rounded-lg hover:scale-105 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer Link */}
      <div
        className="mt-8 text-center pb-12"
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
