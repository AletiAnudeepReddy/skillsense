import MainLayout from "@/components/layout/MainLayout";
import { TrendingUp, Zap, FileCheck } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Resume from "@/models/Resume";
import Analysis from "@/models/Analysis";
import { redirect } from "next/navigation";

interface StatCard {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
}

interface RecentAnalysis {
  id: string;
  jobTitle: string;
  company: string;
  matchScore: number;
  date: string;
}

export default async function DashboardPage() {
  // Server-side: get session and fetch user-specific data
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = (session.user as any).id as string;

  await connectDB();

  // Total analyses
  const totalAnalyses = await Analysis.countDocuments({ userId });

  // Average match score
  const analysesForAvg = await Analysis.find(
    { userId },
    { matchScore: 1 }
  ).lean();
  const avgMatch = analysesForAvg.length
    ? Math.round(
        analysesForAvg.reduce((sum, a: any) => sum + (a.matchScore || 0), 0) /
          analysesForAvg.length
      )
    : 0;

  // Resumes count
  const resumesCount = await Resume.countDocuments({ userId });

  // Recent analyses (last 3)
  const recentRaw = await Analysis.find({ userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .populate("jobProfileId")
    .lean();

  const recentAnalyses: RecentAnalysis[] = recentRaw.map((r: any) => {
    const job = r.jobProfileId || {};
    const date = r.createdAt
      ? new Date(r.createdAt).toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "";

    return {
      id: r._id.toString(),
      jobTitle: job.jobTitle || (r.jobTitle as string) || "Untitled",
      company: job.company || r.company || "—",
      matchScore: typeof r.matchScore === "number" ? r.matchScore : 0,
      date,
    };
  });

  const statCards: StatCard[] = [
    {
      title: "Total Analyses",
      value: totalAnalyses,
      subtitle: "analyses performed",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Average Match Score",
      value: `${avgMatch}%`,
      subtitle: "across all jobs",
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Resumes Uploaded",
      value: resumesCount,
      subtitle: "active resumes",
      icon: <FileCheck className="w-6 h-6 text-purple-600" />,
    },
  ];

  return (
    <MainLayout>
      {/* Welcome Section */}
      <section className="mb-10 mt-5" data-aos="fade-up">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Welcome back to SkillSense AI
        </h1>
        <p className="text-lg text-slate-400">
          Quickly compare your skills to any job and get an AI learning plan.
        </p>
      </section>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 shadow-lg hover:shadow-xl hover:border-slate-600/80 transition-all"
            data-aos="zoom-in"
            data-aos-delay={`${index * 100}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>{card.icon}</div>
              {card.trend && (
                <span className="text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 px-2 py-1 rounded-full">
                  {card.trend}
                </span>
              )}
            </div>
            <h3 className="text-sm font-medium text-slate-400 mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-bold text-slate-100 mb-1">
              {card.value}
            </p>
            <p className="text-sm text-slate-500">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Recent Analyses and Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <div className="lg:col-span-2" data-aos="fade-up">
          <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 shadow-lg">
            <h2 className="text-lg font-bold text-slate-100 mb-4">
              Recent Analyses
            </h2>
            <div className="space-y-3">
              {recentAnalyses.map((analysis, idx) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 border border-slate-700/40 rounded-xl hover:bg-slate-800/50 hover:border-slate-600/60 transition-all cursor-pointer"
                  data-aos="slide-up"
                  data-aos-delay={`${idx * 100}`}
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-100">
                      {analysis.jobTitle}
                    </h3>
                    <p className="text-sm text-slate-400">{analysis.company}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {analysis.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-100">
                        {analysis.matchScore}%
                      </div>
                      <div className="h-1 w-16 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            analysis.matchScore >= 80
                              ? "bg-gradient-to-r from-green-500 to-emerald-500"
                              : analysis.matchScore >= 60
                              ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                              : "bg-gradient-to-r from-red-500 to-rose-500"
                          }`}
                          style={{ width: `${analysis.matchScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Score Chart Placeholder */}
        <div
          className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 shadow-lg"
          data-aos="fade-left"
        >
          <h2 className="text-lg font-bold text-slate-100 mb-4">
            Match Score Over Time
          </h2>
          <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700/40">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">
                Chart coming soon
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Interactive chart will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
