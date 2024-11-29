"use client";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import { StatsCard } from "@/src/components/utils/StateCard";
import { SubscriptionTable } from "./_subscriptionContent/SubscriptionTable";
import MobileTable from "@/src/components/utils/table/MobileTable";
import {
  MOBILE_SUBSCRIPTION_TABLE_HEADER,
  subscriptionTableHeaders
} from "@/app/lib/constant";
import { SubscriptionData } from "@/app/lib/types";
import { useGetSubscriptionData } from "@/src/hooks/useSubscription";
import MobileSubscriptionTableLyaout from "./_subscriptionContent/MobileSubscriptionTableLyaout";
const stats = {
  totalSubscriptions: 150,
  activeSubscriptions: 120,
  expiredSubscriptions: 30
};

const SubscriptionPage = () => {
  const { subscriptionDetails } = useGetSubscriptionData();
  // Sample subscription data
  const subscriptionData = subscriptionDetails as SubscriptionData[];
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={Users}
            label="Total Subscriptions"
            value={stats.totalSubscriptions}
          />
          <StatsCard
            icon={CheckCircle}
            label="Active Subscriptions"
            value={stats.activeSubscriptions}
          />
          <StatsCard
            icon={AlertCircle}
            label="Expired Subscriptions"
            value={stats.expiredSubscriptions}
          />
        </div>

        <div className="hidden md:block">
          <SubscriptionTable subscriptions={subscriptionData} />
        </div>
        <MobileSubscriptionTableLyaout
          fields={MOBILE_SUBSCRIPTION_TABLE_HEADER}
          data={subscriptionData}
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
