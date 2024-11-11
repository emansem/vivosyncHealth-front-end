"use client";
import DoctorChartWrapper from "@/src/components/ui/doctor/dashboard/charts/DoctorChartWrapper";
import SubscriptionChart from "@/src/components/ui/doctor/dashboard/charts/WeeklySubscriptionChart";
import StatisticOverview from "@/src/components/ui/doctor/dashboard/StatisticOverview";
import Welcome from "@/src/components/ui/doctor/dashboard/Welcome";
import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-4">
      <Welcome />
      <StatisticOverview />
      <DoctorChartWrapper />
    </div>
  );
}

export default page;
