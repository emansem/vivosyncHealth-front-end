"use client";
import { useManageSubscriptionData } from "@/src/hooks/useSubscription";
// pages/doctor/[id]/subscription.tsx
import CurrentSubscription from "./_subscriptionIdContents/CurrentSubscription";
import SubscriptionPlan from "./_subscriptionIdContents/OtherPlans";
import { useParams } from "next/navigation";
import { SubscriptionData, SubscriptionPlanDataType } from "@/app/lib/types";

// Types for our subscription data
export interface SubscriptionDetails {
  doctorName: string;
  doctorId: string;
  currentPlan: "basic" | "professional" | "enterprise";
  startDate: string;
  endDate: string;
  amount: number;
  status: "Active" | "Expired";
  autoRenew: boolean;
}

// Available plans data
export const availablePlans = [
  {
    name: "basic",
    displayName: "Basic",
    price: 100,
    features: ["24/7 Support", "Basic Analytics", "Up to 100 patients"]
  },
  {
    name: "professional",
    displayName: "Professional",
    price: 200,
    features: [
      "Priority Support",
      "Advanced Analytics",
      "Up to 500 patients",
      "Custom Reports"
    ]
  },
  {
    name: "enterprise",
    displayName: "Enterprise",
    price: 300,
    features: [
      "Dedicated Support",
      "Full Analytics Suite",
      "Unlimited patients",
      "Custom Features"
    ]
  }
];

const DoctorSubscriptionPage = () => {
  const param = useParams();
  const subscriptionId = param["subscriptionId"] as string;
  const {
    currentSubscriptionPlan,
    isPending,
    handleCancelSubscription,
    subscriptionPlans,
    isLoading
  } = useManageSubscriptionData(subscriptionId);

  if (isLoading) return <div>Loading....</div>;
  return (
    <>
      <CurrentSubscription
        isPending={isPending}
        handleCancelSubscription={handleCancelSubscription}
        subscription={currentSubscriptionPlan as SubscriptionData}
      />
      <SubscriptionPlan
        current_subscription={currentSubscriptionPlan as SubscriptionData}
        subscriptionPlans={subscriptionPlans as SubscriptionPlanDataType[]}
      />
    </>
  );
};

export default DoctorSubscriptionPage;
