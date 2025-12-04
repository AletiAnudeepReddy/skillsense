import Link from "next/link";
import {
  UploadCloud,
  FileText,
  Brain,
  GraduationCap,
  ArrowRight,
  Check,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Fixed Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-700/40 bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100">SkillSense AI</h1>
            <span className="ml-2 text-xs font-semibold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              beta
            </span>
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                  See your skill gap for any job in
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {" "}
                    seconds.
                  </span>
                </h2>
                <p className="text-lg text-slate-400 leading-relaxed">
                  Upload your resume, paste a job description, and let
                  SkillSense AI show your strengths, gaps, and a personalized
                  learning roadmap.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-lg hover:shadow-2xl transform hover:scale-105"
                >
                  Start free analysis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-slate-100 border border-slate-600 bg-slate-900/40 backdrop-blur-sm rounded-full hover:bg-slate-800/60 hover:border-slate-500 transition-all duration-200"
                >
                  Try demo
                </Link>
              </div>
            </div>

            {/* Right: Dashboard Preview Card */}
            <div className="hidden lg:block">
              <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full mb-4">
                    <span className="text-sm font-semibold text-green-400">
                      Match Score
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">78%</span>
                    <span className="text-lg text-slate-400">match</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: "78%" }}
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-6">
                  {/* Strong Skills */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">
                      Strong Skills
                    </h3>
                    <div className="space-y-2">
                      {["React", "TypeScript", "Node.js"].map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">
                      Skills to Learn
                    </h3>
                    <div className="space-y-2">
                      {["Python", "AWS", "Docker"].map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 text-sm text-slate-400"
                        >
                          <div className="w-4 h-4 border border-slate-600 rounded-full" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 border-t border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Powerful features to accelerate your job search
            </h3>
            <p className="text-lg text-slate-400">
              Everything you need to identify gaps and master new skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: UploadCloud,
                title: "Upload your resume",
                description: "Supports PDF, DOCX, and TXT formats",
              },
              {
                icon: FileText,
                title: "Paste job description",
                description: "Analyze any job posting from any platform",
              },
              {
                icon: Brain,
                title: "AI-powered analysis",
                description: "Advanced NLP to identify skill gaps accurately",
              },
              {
                icon: GraduationCap,
                title: "Learning roadmap",
                description: "Personalized recommendations to bridge gaps",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-slate-900/40 backdrop-blur-sm border border-slate-700/40 rounded-2xl p-8 hover:border-slate-600/60 hover:bg-slate-900/60 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-indigo-500/30 group-hover:to-cyan-500/30 transition-colors">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 border-t border-slate-700/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Three simple steps to success
            </h3>
            <p className="text-lg text-slate-400">
              Get started in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Upload your resume",
                description:
                  "Share your resume in any format. We'll extract your skills and experience.",
              },
              {
                step: 2,
                title: "Paste job description",
                description:
                  "Copy and paste the job posting you're interested in.",
              },
              {
                step: 3,
                title: "Get your analysis",
                description:
                  "See your match score, skill gaps, and personalized learning plan.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                {/* Connecting line (hidden on mobile) */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 right-0 left-0 h-1 bg-gradient-to-r from-indigo-600/50 to-cyan-600/50 transform translate-x-1/2" />
                )}

                {/* Card */}
                <div className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-8">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-full flex items-center justify-center mb-6 text-white font-bold text-lg">
                    {item.step}
                  </div>

                  <h4 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-6 border-t border-slate-700/40">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-slate-400 mb-8">
            Perfect for students, job seekers, and bootcamp grads
          </p>
          <div className="flex justify-center gap-8 items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 bg-slate-800/40 border border-slate-700/40 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Trusted by learners worldwide
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 border-t border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-cyan-600/50 to-indigo-600/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 group-hover:opacity-75" />

            {/* Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/60 p-12 text-center space-y-8">
              <div>
                <h3 className="text-4xl font-bold text-white mb-4">
                  Ready to see your skill gap?
                </h3>
                <p className="text-lg text-slate-400">
                  Join thousands of job seekers bridging their skills with
                  AI-powered insights.
                </p>
              </div>

              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-indigo-400 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Get started for free
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/40 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-sm text-slate-400">
                © 2025 SkillSense AI. All rights reserved.
              </span>
            </div>

            <div className="flex gap-6 text-sm text-slate-400">
              <a href="#" className="hover:text-slate-200 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-slate-200 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-slate-200 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
