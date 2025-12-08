import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";

export default function InterviewPage() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center" data-aos="fade-up">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl flex items-center justify-center border border-indigo-500/30">
              <Brain className="w-10 h-10 text-indigo-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
            Interview Prep
          </h1>

          {/* Subtitle */}
          <p className="text-md text-slate-400 mb-8 leading-relaxed">
            Get tailored interview questions based on your job analysis
          </p>

          {/* Description */}
          <div className="mb-12 p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-slate-700/50">
            <p className="text-slate-300 mb-4">
              📋 <span className="font-medium">How it works:</span>
            </p>
            <ol className="text-left space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold flex-shrink-0">
                  1
                </span>
                <span>
                  Go to <strong className="text-slate-300">Analysis</strong>{" "}
                  page
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold flex-shrink-0">
                  2
                </span>
                <span>Select or run an analysis on a job posting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold flex-shrink-0">
                  3
                </span>
                <span>
                  Click{" "}
                  <strong className="text-slate-300">
                    &quot;Interview Prep&quot;
                  </strong>{" "}
                  button
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 font-bold flex-shrink-0">
                  4
                </span>
                <span>
                  Practice with AI-generated questions tailored to the role
                </span>
              </li>
            </ol>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-slate-100 mb-1">
                Role-Specific
              </h3>
              <p className="text-sm text-slate-400">
                Questions matching your target role (frontend, backend, etc)
              </p>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-slate-100 mb-1">Level-Aware</h3>
              <p className="text-sm text-slate-400">
                Difficulty adjusted to junior, mid, or senior positions
              </p>
            </div>

            <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:border-indigo-500/30 transition-colors">
              <div className="text-2xl mb-2">💡</div>
              <h3 className="font-semibold text-slate-100 mb-1">
                Skill-Focused
              </h3>
              <p className="text-sm text-slate-400">
                Emphasizes your missing skills from the job analysis
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <p className="text-slate-400">Ready to prepare?</p>
            <Link href="/analysis">
              <Button className="inline-flex items-center gap-2">
                Go to Analysis
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Decorative elements */}
          <div className="mt-16 py-8 border-t border-slate-700/50">
            <p className="text-sm text-slate-500">
              ✨ Interview prep questions are generated from our question
              bank—no LLM needed
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
