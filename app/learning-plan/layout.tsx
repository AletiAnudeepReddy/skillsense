import MainLayout from "@/components/layout/MainLayout";

export default function LearningPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
