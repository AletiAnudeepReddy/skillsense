"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Shield, FileText, Mail } from "lucide-react";

export default function LegalPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
    });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top gradient strip */}
      <div className="relative overflow-hidden border-b border-slate-800/70">
        {/* Left & right gradient beams instead of center circle */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(56,189,248,0.18),_transparent_55%),_radial-gradient(circle_at_right,_rgba(129,140,248,0.18),_transparent_55%)] opacity-90" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div data-aos="fade-right">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/40 bg-slate-900/70 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
              Trust • Transparency • Control
            </p>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-50 animated-gradient-text">
              Legal &amp; Trust Center
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm md:text-base">
              Learn how SkillSense AI protects your data, outlines our terms of
              use, and how to get in touch with us.
            </p>
          </div>

          {/* Mini navbar */}
          <div
            className="relative mt-4 md:mt-0"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            <div className="rounded-2xl bg-slate-950/85 border border-slate-700/70 backdrop-blur-xl p-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
              <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-[0.16em]">
                Jump to section
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <button
                  onClick={() => scrollToSection("privacy")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/40 text-cyan-200 transition-all text-left"
                >
                  <Shield className="w-4 h-4" />
                  Privacy Policy
                </button>
                <button
                  onClick={() => scrollToSection("terms")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900/80 hover:bg-slate-800/90 border border-emerald-500/35 text-emerald-200 transition-all text-left"
                >
                  <FileText className="w-4 h-4" />
                  Terms of Use
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 bg-slate-900/80 hover:bg-slate-800/90 border border-indigo-500/40 text-indigo-200 transition-all text-left"
                >
                  <Mail className="w-4 h-4" />
                  Contact &amp; Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Privacy – teal / cyan feel */}
        <section
          id="privacy"
          className="scroll-mt-24 relative rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/90 p-8 md:p-10 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/40 mb-4">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Privacy Policy
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
              Your data, your control.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-6">
              SkillSense AI is designed to help you understand and close your
              skill gaps — not to sell your data. We collect only what&apos;s
              needed to analyze your resume, generate insights, and improve your
              experience.
            </p>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/80 border border-slate-800/90 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.8)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  What we collect
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• Basic account info: name, email, auth provider.</li>
                  <li>• Resume content you upload or paste.</li>
                  <li>• Job descriptions or links you analyze.</li>
                  <li>• Generated analyses and learning plans.</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-950/80 border border-slate-800/90 p-5 shadow-[0_20px_40px_rgba(15,23,42,0.8)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  How we use it
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• To compute skill matches and gaps.</li>
                  <li>• To generate personalized learning roadmaps.</li>
                  <li>
                    • To improve models and product experience (in anonymized
                    form).
                  </li>
                  <li>• Never to sell your personal data to third parties.</li>
                </ul>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500">
              You can request deletion of your data at any time by contacting us
              via the support details below.
            </p>
          </div>
        </section>

        {/* Terms – emerald / lime feel */}
        <section
          id="terms"
          className="scroll-mt-24 relative rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/90 p-8 md:p-10 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-lime-400/10 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-emerald-500/40 mb-4">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Terms of Use
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
              Simple terms, no surprises.
            </h2>
            <p className="text-slate-300 text-sm md:text-base mb-6">
              By using SkillSense AI, you agree to use the platform responsibly
              and understand that our insights are guidance — not guaranteed
              outcomes.
            </p>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl bg-slate-950/85 border border-slate-800/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.85)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  Fair use
                </h3>
                <p>
                  You agree not to misuse the platform, attempt to
                  reverse-engineer our systems, or upload harmful or illegal
                  content.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/85 border border-slate-800/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.85)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  No guarantees
                </h3>
                <p>
                  We help you understand your skills and prepare better, but we
                  cannot guarantee any specific job offers, salaries, or
                  outcomes.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/85 border border-slate-800/90 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.85)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  Intellectual property
                </h3>
                <p>
                  SkillSense AI, its branding, UI, and underlying models are
                  protected. You retain ownership of your resume and uploaded
                  content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact – full gradient card, strongest glow */}
        <section
          id="contact"
          className="scroll-mt-24 relative rounded-3xl border border-slate-800/80 bg-gradient-to-br from-emerald-500/15 via-cyan-500/12 to-indigo-500/18 p-8 md:p-10 overflow-hidden"
          data-aos="fade-up"
        >
          <div className="pointer-events-none absolute -top-32 -left-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-10 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-indigo-400/60 mb-4">
              <Mail className="w-4 h-4 text-indigo-300" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-200">
                Contact &amp; Support
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
              Need help or have feedback?
            </h2>
            <p className="text-slate-200 text-sm md:text-base mb-6">
              We&apos;d love to hear from you — whether it&apos;s a bug report,
              a feature idea, or just to say hi.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/85 border border-slate-800/80 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.95)]">
                <h3 className="text-sm font-semibold text-slate-100 mb-2">
                  Reach us
                </h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>
                    Email:{" "}
                    <span className="text-cyan-200 font-medium">
                      support@skillsense.ai
                    </span>
                  </li>
                  <li>Response time: typically within 24–48 hours.</li>
                </ul>
              </div>

              <form className="rounded-2xl bg-slate-950/85 border border-slate-800/80 p-5 space-y-4 shadow-[0_20px_50px_rgba(15,23,42,0.95)]">
                <h3 className="text-sm font-semibold text-slate-100">
                  Quick message
                </h3>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-lg bg-slate-950/90 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <textarea
                  rows={4}
                  placeholder="Tell us how we can help..."
                  className="w-full rounded-lg bg-slate-950/90 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
                <button
                  type="button"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 font-semibold text-sm py-2.5 hover:scale-[1.02] transition-transform shadow-[0_18px_45px_rgba(56,189,248,0.45)]"
                >
                  Send Message
                </button>
              </form>
            </div>

            <p className="mt-6 text-xs text-slate-200/70">
              By contacting us, you agree that we may use your message to
              respond and improve SkillSense AI.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
