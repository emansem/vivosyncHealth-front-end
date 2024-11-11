"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { DashboardLayout } from "./Dashboard";
import { MainLayout } from "./MainPageLayout";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  //All protected routes page layout
  if (pathName.startsWith("/doctor"))
    return <DashboardLayout>{children}</DashboardLayout>;

  //Public pages like home , about us and contact us goes here
  if (pathName.startsWith("/about")) {
    return <MainLayout>{children}</MainLayout>;
  }
  if (pathName === "/") {
    return <MainLayout>{children}</MainLayout>;
  } else {
    return <MainLayout>{children}</MainLayout>;
  }
}

export default LayoutWrapper;
