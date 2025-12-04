"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">S</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-indigo-300">
                SkillSense AI
              </span>
              <span className="text-xs text-slate-400">
                Analyze skills. Land roles.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm text-slate-300 hover:text-cyan-300"
              >
                Features
              </a>
              <a
                href="#how"
                className="text-sm text-slate-300 hover:text-cyan-300"
              >
                How it works
              </a>
              <a
                href="#faq"
                className="text-sm text-slate-300 hover:text-cyan-300"
              >
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/login"
                className="px-3 py-1.5 text-sm rounded-md text-slate-200 hover:text-white hover:bg-slate-900/40"
              >
                Log in
              </a>
              <a
                href="/register"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:opacity-95"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
