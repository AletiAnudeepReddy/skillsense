import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/providers/AuthProvider";
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
      <body className="font-sans bg-slate-950 text-slate-100 overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 -z-10" />
        <AuthProvider>
          <div className="min-h-screen flex flex-col">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
