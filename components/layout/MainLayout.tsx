import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (hidden on small) */}
      <aside className="hidden md:flex w-64 flex-col border-r border-slate-800 bg-slate-950/70 backdrop-blur-xl">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        <main className="flex-1 overflow-y-auto pt-4 px-4 md:pt-6 md:px-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
