"use client";
import { StatsCard } from "./_subscriptionContent/StatusCard";
import SubscriptionDesktopView from "./_subscriptionContent/SubscriptionDesktopView";
import SubscriptionMobileView from "./_subscriptionContent/SubscriptionMobileView";
import FIlterSection from "./_subscriptionContent/FIlterSection";

// Sample subscription data
export const subscriptions = [
  {
    id: "SUB001",
    customerName: "Dr. Sarah Johnson",
    planName: "Premium Plan",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: "$299/year",
    lastPayment: "2024-01-15",
    autoRenewal: true
  },
  {
    id: "SUB002",
    customerName: "Dr. Michael Chen",
    planName: "Basic Plan",
    status: "pending",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    amount: "$199/year",
    lastPayment: "2024-02-01",
    autoRenewal: true
  }
];
const SubscriptionManagement = () => {
  // Stats data structure
  const stats = [
    {
      title: "Total Revenue",
      value: "$52,420",
      subValue: "+12% from last month",
      type: "revenue"
    },
    {
      title: "Active Subscriptions",
      value: "842",
      subValue: "92% renewal rate",
      type: "activeSubscriptions"
    },
    {
      title: "Expiring Soon",
      value: "45",
      subValue: "Next 30 days",
      type: "expiringSoon"
    },
    {
      title: "Cancelled",
      value: "23",
      subValue: "This month",
      type: "cancelled"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Subscription Management
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <FIlterSection />

      {/* Subscription Table - Desktop */}
      <SubscriptionDesktopView />

      {/* Subscription Cards - Mobile */}
      <SubscriptionMobileView />
    </div>
  );
};

export default SubscriptionManagement;
