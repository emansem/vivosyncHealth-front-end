"use client";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import { StatsCard } from "@/src/components/utils/StateCard";
import { subscriptionData } from "@/data/demoData";
import { SubscriptionTable } from "./_subscriptionContent/SubscriptionTable";

const SubscriptionPage = () => {
  // In a real app, this would come from an API
  const stats = {
    totalSubscriptions: 150,
    activeSubscriptions: 120,
    expiredSubscriptions: 30
  };

  // Sample subscription data

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

        {/* Subscription Table */}
        <SubscriptionTable subscriptions={subscriptionData} />
      </div>
    </div>
  );
};

export default SubscriptionPage;
