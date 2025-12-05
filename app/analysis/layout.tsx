import MainLayout from "@/components/layout/MainLayout";

export default function AnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
