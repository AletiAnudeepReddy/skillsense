"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

// shadcn / UI primitives (assumed exported from this path)
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// The project doesn't include Label/Tabs shadcn primitives centrally,
// so provide lightweight local implementations here to avoid missing imports.
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm text-slate-300 mb-1">{children}</label>
  );
}

function TabsRoot({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-800/40 p-1">{children}</div>
  );
}

function TabsTrigger({
  value,
  active,
  onClick,
  children,
}: {
  value: string;
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
        active
          ? "bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950"
          : "text-slate-300 hover:bg-slate-700/40"
      }`}
      data-value={value}
    >
      {children}
    </button>
  );
}

function TabsContent({
  hidden,
  children,
}: {
  hidden?: boolean;
  children: React.ReactNode;
}) {
  return <div style={{ display: hidden ? "none" : "block" }}>{children}</div>;
}

import { PageTransition } from "@/components/layout/PageTransition";
import { useToast } from "@/components/providers/ToastProvider";

type ProfileFormState = {
  name: string;
  headline: string;
  location: string;
};

export default function SettingsPage(): JSX.Element {
  const { data: session } = useSession();
  const toast = useToast?.();

  const [activeTab, setActiveTab] = useState<string>("profile");
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<ProfileFormState>({
    name: "",
    headline: "",
    location: "",
  });

  // Preferences local state
  const [darkMode, setDarkMode] = useState(false);
  const [emailSummaries, setEmailSummaries] = useState(true);
  const [emailLearning, setEmailLearning] = useState(true);
  const [preferredRoles, setPreferredRoles] = useState("");

  useEffect(() => {
    if (session?.user) {
      const maybeName =
        (session.user.name as string) || (session.user.email as string) || "";
      setProfile((p) => ({ ...p, name: maybeName }));
      // if there are custom fields on session.user, prefill headline/location
      // (many setups don't include these so we keep them empty by default)
      // @ts-ignore
      if (session.user.headline)
        setProfile((p) => ({ ...p, headline: session.user.headline }));
      // @ts-ignore
      if (session.user.location)
        setProfile((p) => ({ ...p, location: session.user.location }));
    }
  }, [session]);

  const handleChange =
    (key: keyof ProfileFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfile((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error(`Status ${res.status}`);

      const msg = "Profile updated";
      if (toast && typeof toast.addToast === "function") {
        toast.addToast(msg, "success");
      } else {
        console.log(msg);
      }
    } catch (err) {
      const msg = "Unable to save profile";
      if (toast && typeof toast.addToast === "function") {
        toast.addToast(msg, "error");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    // Currently a stub - persist preferences later
    console.log({ darkMode, emailSummaries, emailLearning, preferredRoles });
    if (toast && typeof toast.addToast === "function") {
      toast.addToast("Preferences saved (stub)", "success");
    }
  };

  // If not signed in
  if (!session) {
    return (
      <main className="p-8 min-h-[60vh] flex items-center justify-center">
        <Card className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
          <h2 className="text-2xl font-semibold text-white mb-2">
            Please sign in to manage your settings.
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            You need an account to update profile and preferences.
          </p>
          <div className="flex gap-3">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950">
                Sign in
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const userInitial = (session.user?.name || session.user?.email || "?")
    .toString()
    .charAt(0)
    .toUpperCase();
  const userEmail = session.user?.email || "";

  return (
    <PageTransition>
      <main className="p-6">
        <div className="mb-8" data-aos="fade-down">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-sm text-slate-400">
                Manage your profile, preferences, and account.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-cyan-300 border border-slate-700">
                Beta
              </span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: Profile summary card */}
          <section data-aos="fade-right">
            <Card className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border-2 border-dashed border-slate-700/70 p-6 ">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-500 flex items-center justify-center text-slate-950 text-xl font-bold">
                  {userInitial}
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    {session.user?.name || session.user?.email}
                  </div>
                  <div className="text-sm text-slate-400">{userEmail}</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-slate-300 font-medium">About</h3>
                <p className="text-sm text-slate-400 mt-2">
                  Personalize your public profile so employers and learning
                  plans can better match you.
                </p>
              </div>

              <div className="mt-6 flex gap-2">
                <Button className="px-4 py-2 bg-slate-800 border border-slate-700 text-white">
                  View Profile
                </Button>
                <Button className="px-4 py-2 border border-slate-700 text-slate-200">
                  Disconnect
                </Button>
              </div>
            </Card>
          </section>

          {/* Right: Tabs + Forms (span 2 cols) */}
          <section className="md:col-span-2" data-aos="fade-up">
            <Card className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-6">
              <TabsRoot>
                <div className="flex items-center justify-between mb-4">
                  <TabsList>
                    <TabsTrigger
                      value="profile"
                      active={activeTab === "profile"}
                      onClick={() => setActiveTab("profile")}
                    >
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="preferences"
                      active={activeTab === "preferences"}
                      onClick={() => setActiveTab("preferences")}
                    >
                      Preferences
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent hidden={activeTab !== "profile"}>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Read-only info */}
                    <div>
                      <div className="rounded-2xl p-4 bg-slate-800/30 border border-slate-700">
                        <h4 className="text-sm text-slate-300 font-medium">
                          Public Info
                        </h4>
                        <div className="mt-4">
                          <p className="text-sm text-slate-200 font-semibold">
                            {profile.name || session.user?.name}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {userEmail}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Edit form */}
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSaveProfile();
                        }}
                        className="space-y-4"
                      >
                        <div>
                          <Label>Full name</Label>
                          <Input
                            value={profile.name}
                            onChange={handleChange("name")}
                            className="bg-slate-800/30 text-white"
                          />
                        </div>

                        <div>
                          <Label>Headline / Role</Label>
                          <Input
                            value={profile.headline}
                            onChange={handleChange("headline")}
                            placeholder="Aspiring Full Stack Developer"
                            className="bg-slate-800/30 text-white"
                          />
                        </div>

                        <div>
                          <Label>Location</Label>
                          <Input
                            value={profile.location}
                            onChange={handleChange("location")}
                            placeholder="Seattle, WA"
                            className="bg-slate-800/30 text-white"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 hover:scale-105 transition transform"
                          >
                            {loading ? "Saving..." : "Save changes"}
                          </Button>
                          <Button
                            type="button"
                            className="border border-slate-700 text-slate-200"
                            onClick={() => {
                              // reset to session values
                              const maybeName =
                                (session.user?.name as string) ||
                                (session.user?.email as string) ||
                                "";
                              setProfile({
                                name: maybeName,
                                headline: "",
                                location: "",
                              });
                            }}
                          >
                            Reset
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent hidden={activeTab !== "preferences"}>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm text-slate-300 font-medium">
                              Dark mode
                            </h4>
                            <p className="text-xs text-slate-400">
                              Enable the dark theme (UI stub)
                            </p>
                          </div>
                          <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={(e) => setDarkMode(e.target.checked)}
                            className="w-5 h-5"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                        <h4 className="text-sm text-slate-300 font-medium">
                          Email notifications
                        </h4>
                        <div className="mt-3 space-y-2">
                          <label className="flex items-center justify-between text-sm text-slate-300">
                            <span>Job match summaries</span>
                            <input
                              type="checkbox"
                              checked={emailSummaries}
                              onChange={(e) =>
                                setEmailSummaries(e.target.checked)
                              }
                              className="w-5 h-5"
                            />
                          </label>
                          <label className="flex items-center justify-between text-sm text-slate-300">
                            <span>Weekly learning suggestions</span>
                            <input
                              type="checkbox"
                              checked={emailLearning}
                              onChange={(e) =>
                                setEmailLearning(e.target.checked)
                              }
                              className="w-5 h-5"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Preferred roles (comma separated)</Label>
                      <Input
                        value={preferredRoles}
                        onChange={(e) => setPreferredRoles(e.target.value)}
                        placeholder="Frontend, Backend, Data Scientist"
                        className="bg-slate-800/30 text-white"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        onClick={handleSavePreferences}
                        className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-slate-950 hover:scale-105 transition transform"
                      >
                        Save preferences
                      </Button>
                      <Button
                        onClick={() => {
                          setPreferredRoles("");
                          setEmailLearning(true);
                          setEmailSummaries(true);
                          setDarkMode(false);
                        }}
                        className="border border-slate-700 text-slate-200"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </TabsRoot>
            </Card>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
