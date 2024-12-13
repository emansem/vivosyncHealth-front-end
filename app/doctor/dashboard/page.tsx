"use client";
import DoctorChartWrapper from "@/app/doctor/dashboard/_doctorContent/charts/DoctorChartWrapper";
import StatisticOverview from "@/app/doctor/dashboard/_doctorContent/StatisticOverview";
import Welcome from "@/app/doctor/dashboard/_doctorContent/Welcome";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import { useDoctorDashboard } from "@/src/hooks/useDoctorDashboard";
function Page() {
  const doctorData = useDoctorDashboard();

  if (doctorData?.isLoading) return <LoadingState message="Please wait..." />;

  const details = doctorData?.doctorData;
  return (
    <div className="flex flex-col gap-4">
      <Welcome doctorName={details?.doctorName as string} />
      <StatisticOverview
        totalPatient={details?.totalPatient as number}
        totalBalance={details?.totalBalance as number}
        inactiveSubscription={details?.inactiveSubscription as number}
        activeSubscription={details?.activeSubscription as number}
      />
      <DoctorChartWrapper />
    </div>
  );
}

export default Page;
