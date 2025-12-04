import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SkillSense AI - Job Skill Gap Analyzer",
  description:
    "AI-powered job skill gap analyzer to help you bridge your skills to your dream role",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50`}
      >
        {/* decorative background */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 -z-10" />
        <AuthProvider>
          <LoadingProvider>
            <div className="min-h-screen flex flex-col">{children}</div>
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
