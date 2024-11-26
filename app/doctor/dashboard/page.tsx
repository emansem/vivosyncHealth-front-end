"use client";
import DoctorChartWrapper from "@/src/components/ui/doctor/dashboard/charts/DoctorChartWrapper";
import StatisticOverview from "@/src/components/ui/doctor/dashboard/StatisticOverview";
import Welcome from "@/src/components/ui/doctor/dashboard/Welcome";
function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Welcome />
      <StatisticOverview />
      <DoctorChartWrapper />
    </div>
  );
}

export default Page;
