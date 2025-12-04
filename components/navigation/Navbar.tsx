"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLoading } from "@/components/providers/LoadingProvider";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // stop loading after route change
    stopLoading();
    // close dropdown on route change
    setIsDropdownOpen(false);
  }, [pathname, stopLoading]);

  const handlePush = (path: string) => {
    startLoading();
    router.push(path);
  };

  const handleLogout = async () => {
    startLoading();
    await signOut({ redirect: false });
    // after signOut, navigate to home
    router.push("/");
    stopLoading();
  };

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/60 backdrop-blur-xl">
      {/* Top loading bar */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-x-0 top-0 h-[3px] z-50">
            <div className="h-full w-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 animate-pulse" />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
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
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Guest links */}
            {!user && (
              <>
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
                  <button
                    onClick={() => handlePush("/login")}
                    className="px-3 py-1.5 text-sm rounded-md text-slate-200 hover:text-white hover:bg-slate-900/40"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => handlePush("/register")}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:opacity-95"
                  >
                    Get started
                  </button>
                </div>
              </>
            )}

            {/* Authenticated */}
            {user && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handlePush("/resume/upload")}
                  className="hidden sm:inline-flex items-center px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition"
                >
                  Add Resume
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-900/30 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-semibold text-white">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : user.email?.charAt(0) || "U"}
                    </div>
                    <div className="hidden sm:flex flex-col text-left">
                      <span className="text-sm font-medium text-slate-100 truncate max-w-[140px]">
                        {user.name ?? user.email}
                      </span>
                      <span className="text-xs text-slate-400">
                        {user.email}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-xl shadow-xl z-50">
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handlePush("/settings");
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-slate-800/40"
                      >
                        Profile
                      </button>
                      <div className="border-t border-slate-800/40" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-slate-100 hover:bg-slate-800/40"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
