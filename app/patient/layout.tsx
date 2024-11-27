import PatientDashboard from "@/src/components/ui/layout/patientLayout/PatientDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Dashboard - VivoSynchealth",
  description: "Patient dashboard and management"
};

export default function PatientLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PatientDashboard>{children}</PatientDashboard>;
}
