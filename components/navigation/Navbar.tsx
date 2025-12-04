"use client";

import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="border-b border-slate-700/40 bg-slate-900/40 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-lg font-semibold text-slate-100">
            SkillSense AI
          </h1>
        </div>

        {/* Center/Right: Quick actions and user menu */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-lg hover:from-cyan-500 hover:to-indigo-500 transition-all shadow-lg">
            + Run New Analysis
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                JD
              </div>
              <span className="hidden sm:inline text-sm font-medium text-slate-100">
                John Doe
              </span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-xl z-50">
                <div className="px-4 py-3 border-b border-slate-700/40">
                  <p className="text-sm font-medium text-slate-100">John Doe</p>
                  <p className="text-xs text-slate-400">john@example.com</p>
                </div>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-100 hover:bg-slate-800/50 hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
