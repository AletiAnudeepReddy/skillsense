"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Activity,
  Settings,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const navigationItems: Array<any> = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Resume",
    href: "/resume",
    icon: FileText,
    children: [
      { label: "Upload", href: "/resume/upload" },
      { label: "History", href: "/resume/history" },
    ],
  },
  { label: "Jobs", href: "/jobs", icon: Briefcase },
  { label: "Analysis", href: "/analysis", icon: Activity },
  {
    label: "Learning Plan",
    href: "/learning-plan",
    icon: Activity,
    disabled: true,
  },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openParents, setOpenParents] = useState<Record<string, boolean>>({});

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-40 p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-slate-300" />
        ) : (
          <Menu className="w-5 h-5 text-slate-300" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-18 w-64 h-[calc(100vh-4rem)] bg-slate-900/40 backdrop-blur-md border-r border-slate-700/40 transition-transform duration-300 z-40 flex flex-col overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="flex-1 p-4 space-y-2 overflow-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href) || (item.children || []).some((c: any) => pathname === c.href);

            // If item has children render expandable section
            if (item.children) {
              const isParentOpen = !!openParents[item.label] || active;
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenParents((s) => ({ ...s, [item.label]: !s[item.label] }))}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      item.disabled
                        ? "text-slate-500 cursor-not-allowed opacity-50"
                        : active
                        ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                    }`}
                    aria-expanded={isParentOpen}
                    aria-disabled={item.disabled}
                  >
                    {Icon ? <Icon className="w-5 h-5 flex-shrink-0" /> : <span className="w-5" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isParentOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isParentOpen && (
                    <div className="mt-2 ml-6 space-y-1">
                      {item.children.map((child: any) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 rounded-md text-sm transition-all ${
                            pathname === child.href
                              ? "bg-slate-800/60 text-slate-100"
                              : "text-slate-300 hover:bg-slate-800/40 hover:text-slate-100"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  item.disabled
                    ? "text-slate-500 cursor-not-allowed opacity-50"
                    : active
                    ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"
                }`}
                aria-disabled={item.disabled}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
                {item.disabled && (
                  <span className="ml-auto text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">
                    soon
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700/40 bg-slate-900/60 flex items-center justify-center gap-2 flex-shrink-0">
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-mono text-xs text-slate-400">v0.1.0</span>
            <span className="ml-1 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent font-semibold">
              beta
            </span>
          </p>
        </div>
      </aside>
    </>
  );
}
