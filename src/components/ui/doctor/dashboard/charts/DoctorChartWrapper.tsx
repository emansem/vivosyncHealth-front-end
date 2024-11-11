import WeeklyRevenueChart from "./WeeklyRenenueChart";
import WeeklySubscriptionChart from "./WeeklySubscriptionChart";

function DoctorChartWrapper() {
  return (
    <div className="flex items-center flex-col lg:flex-row justify-between gap-4">
      <WeeklyRevenueChart />
      <WeeklySubscriptionChart />
    </div>
  );
}

export default DoctorChartWrapper;
