import { StatsCard } from "@/src/components/utils/StateCard";
import { Users, UserPlus, DollarSign } from "lucide-react";

export const StatsSection = () => {
  // Stats data could come from props or API in a real app
  const statsData = {
    totalReferrals: 15,
    activeReferrals: 8,
    totalRewards: 250
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard
        icon={Users}
        label="Total Referrals"
        value={statsData.totalReferrals}
      />
      <StatsCard
        icon={UserPlus}
        label="Active Referrals"
        value={statsData.activeReferrals}
      />
      <StatsCard
        icon={DollarSign}
        label="Total Rewards"
        value={`$${statsData.totalRewards}`}
      />
    </div>
  );
};
