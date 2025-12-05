import Link from "next/link";
import {
  UploadCloud,
  FileText,
  Brain,
  GraduationCap,
  ArrowRight,
  Check,
} from "lucide-react";
import { Briefcase, Users, Rocket } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Fixed Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-800 bg-gradient-to-r from-slate-950/80 via-indigo-950/60 to-slate-950/80 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-md">S</span>
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
              className="px-5 py-2 text-sm font-medium border border-slate-700 rounded-xl text-slate-300 hover:text-slate-100 transition-colors"
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
            <div className="space-y-8" data-aos="fade-up">
              <div className="space-y-6">
                <h2
                  className="text-5xl lg:text-6xl font-bold leading-tight text-white"
                  data-aos="fade-down"
                  data-aos-delay="100"
                >
                  See your skill gap for any job in
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {" "}
                    seconds.
                  </span>
                </h2>
                <p
                  className="text-lg text-slate-400 leading-relaxed"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Upload your resume, paste a job description, and let
                  SkillSense AI show your strengths, gaps, and a personalized
                  learning roadmap.
                </p>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
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
            {/* Right: Dashboard Preview Card */}
            <div
              className="hidden lg:block"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div className="relative">
                {/* Glowing background blob */}
                <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(45,212,191,0.35),_transparent_60%)] opacity-80 blur-3xl" />

                {/* Gradient border wrapper */}
                <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/70 via-cyan-500/60 to-indigo-500/70 p-[1px] shadow-[0_0_60px_rgba(34,197,94,0.35)]">
                  <div className="bg-slate-950/90 backdrop-blur-2xl rounded-3xl border border-slate-800/70 p-8 shadow-2xl transform hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.9)] transition-all duration-300">
                    {/* Header */}
                    <div className="mb-8 flex items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900/80 border border-emerald-400/40 rounded-full">
                          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
                            Match score insight
                          </span>
                        </div>
                        <div className="mt-4 flex items-baseline gap-2">
                          <span className="text-5xl font-semibold tracking-tight text-slate-50">
                            78%
                          </span>
                          <span className="text-sm font-medium text-emerald-300/90 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-400/40">
                            Strong fit
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-slate-400">
                          Compared to a modern full-stack developer job
                          description.
                        </p>
                      </div>

                      {/* Small radial indicator */}
                      <div className="hidden md:flex h-20 w-20 items-center justify-center rounded-full bg-slate-900/80 border border-slate-700/70 shadow-inner">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-400 flex items-center justify-center text-xs font-semibold text-slate-950">
                          Live
                          <br />
                          Overview
                        </div>
                      </div>
                    </div>

                    {/* Progress + mini stats */}
                    <div className="mb-8 space-y-3">
                      <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400"
                          style={{ width: "78%" }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Skill match</span>
                        <div className="flex gap-3">
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 border border-slate-700/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            12 matched skills
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 border border-slate-700/70">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            3 gaps to close
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* Strong Skills */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                          Strong skills
                        </h3>
                        <div className="space-y-2">
                          {["React", "TypeScript", "Node.js"].map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between rounded-xl bg-slate-900/80 border border-emerald-400/25 px-3 py-2 text-xs text-slate-200 shadow-sm"
                            >
                              <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span>{skill}</span>
                              </div>
                              <span className="text-[10px] uppercase tracking-wide text-emerald-300/90">
                                hiring trend +
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills to Learn */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-400 mb-3">
                          Skills to learn next
                        </h3>
                        <div className="space-y-2">
                          {["Python", "AWS", "Docker"].map((skill) => (
                            <div
                              key={skill}
                              className="flex items-center justify-between rounded-xl bg-slate-900/70 border border-slate-700/80 px-3 py-2 text-xs text-slate-200"
                            >
                              <div className="flex items-center gap-2">
                                <div className="relative flex h-4 w-4 items-center justify-center">
                                  <div className="h-4 w-4 rounded-full border border-slate-600" />
                                  <div className="absolute h-2 w-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition" />
                                </div>
                                <span>{skill}</span>
                              </div>
                              <span className="text-[10px] uppercase tracking-wide text-amber-300/90">
                                high impact
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer note */}
                    <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Powered by SkillSense AI</span>
                      <span className="text-cyan-300/90">
                        + Generate a learning plan in 1 click →
                      </span>
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
          <div className="text-center mb-16" data-aos="fade-up">
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
                  data-aos="zoom-in"
                  data-aos-delay={`${index * 100}`}
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
          <div className="text-center mb-16" data-aos="fade-up">
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
                <div
                  className="relative z-10 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-8"
                  data-aos="flip-up"
                  data-aos-delay={`${index * 150}`}
                >
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
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <p className="text-lg text-slate-400 mb-8">
            Perfect for students, job seekers, and bootcamp grads
          </p>

          <div className="flex justify-center gap-10 items-center">
            {[
              { icon: GraduationCap, label: "Students" },
              { icon: Briefcase, label: "Job Seekers" },
              { icon: Users, label: "Bootcamps" },
              { icon: Rocket, label: "Career Changers" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  data-aos="zoom-in"
                  data-aos-delay={index * 120}
                  className="group flex flex-col items-center"
                >
                  <div
                    className="w-16 h-16 bg-slate-900/60 border border-slate-700/50 backdrop-blur-md rounded-xl flex items-center justify-center
            transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                  >
                    <Icon className="w-8 h-8 text-cyan-400 group-hover:text-indigo-400 transition-colors" />
                  </div>

                  <span className="mt-3 text-xs text-slate-400 uppercase tracking-wide opacity-70 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-slate-500 mt-8">
            Trusted by learners worldwide
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 border-t border-slate-700/40">
        <div className="max-w-4xl mx-auto">
          <div className="relative group" data-aos="zoom-in">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-cyan-600/50 to-indigo-600/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50 group-hover:opacity-75" />

            {/* Card */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/60 p-12 text-center space-y-8">
              <div data-aos="fade-up" data-aos-delay="100">
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
                data-aos="pulse"
                data-aos-delay="200"
              >
                Get started for free
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t border-slate-700/40 py-10 px-6"
        data-aos="fade-up"
      >
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
              <a
                href="/legal#privacy"
                className="hover:text-slate-200 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/legal#terms"
                className="hover:text-slate-200 transition-colors"
              >
                Terms
              </a>
              <a
                href="/legal#contact"
                className="hover:text-slate-200 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
