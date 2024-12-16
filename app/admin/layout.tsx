import DashboardLayout from "@/src/components/ui/layout/admin/AdminDashboardLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - VivoSynchealth",
  description: "Admin dashboard and management"
};

export default function AdminDashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
