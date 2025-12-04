import Navbar from "@/components/navigation/Navbar";
import Sidebar from "@/components/navigation/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Navbar spans full width */}
      <Navbar />

      <div className="flex">
        {/* Sidebar is fixed (handles its own responsiveness) - rendered here so markup is present */}
        <Sidebar />

        {/* Main content: on md+ leave space for fixed sidebar (w-64) */}
        <main className="flex-1 overflow-y-auto mt-0 md:ml-64">
          <div className="pt-6 px-4 md:pt-6 md:px-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
