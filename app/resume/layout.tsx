import MainLayout from "@/components/layout/MainLayout";

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
