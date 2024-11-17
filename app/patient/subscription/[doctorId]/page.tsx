// types/subscription.ts
"use client";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export interface PlanFeature {
  id: string;
  name: string;
  included: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: PlanFeature[];
}

export interface DoctorSubscription {
  doctorId: string;
  doctorName: string;
  currentPlan: {
    name: string;
    startDate: string;
    endDate: string;
    status: "active" | "expired" | "cancelled";
    autoRenew: boolean;
    price: number;
  };
}

// components/CurrentPlanCard.tsx

interface CurrentPlanProps {
  subscription: DoctorSubscription;
  onRenew: () => void;
  onCancel: () => void;
}
const availablePlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Basic",
    price: 99,
    duration: 12,
    features: [
      { id: "1", name: "Up to 100 patients", included: true },
      { id: "2", name: "Basic analytics", included: true },
      { id: "3", name: "Email support", included: true },
      { id: "4", name: "Advanced analytics", included: false },
      { id: "5", name: "Custom branding", included: false }
    ]
  },
  {
    id: "2",
    name: "Premium",
    price: 299,
    duration: 12,
    features: [
      { id: "1", name: "Unlimited patients", included: true },
      { id: "2", name: "Advanced analytics", included: true },
      { id: "3", name: "Priority support", included: true },
      { id: "4", name: "Custom branding", included: true },
      { id: "5", name: "API access", included: false }
    ]
  },
  {
    id: "3",
    name: "Enterprise",
    price: 499,
    duration: 12,
    features: [
      { id: "1", name: "Unlimited patients", included: true },
      { id: "2", name: "Advanced analytics", included: true },
      { id: "3", name: "24/7 support", included: true },
      { id: "4", name: "Custom branding", included: true },
      { id: "5", name: "API access", included: true }
    ]
  }
];

export const CurrentPlanCard = ({
  subscription,
  onRenew,
  onCancel
}: CurrentPlanProps) => {
  const daysRemaining = Math.ceil(
    (new Date(subscription.currentPlan.endDate).getTime() -
      new Date().getTime()) /
      (1000 * 3600 * 24)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "expired":
        return "text-red-600 bg-red-100";
      case "cancelled":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Current Subscription</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Plan</span>
          <span className="font-semibold">{subscription.currentPlan.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Status</span>
          <span
            className={`${getStatusColor(
              subscription.currentPlan.status
            )} px-3 py-1 rounded-full`}
          >
            {subscription.currentPlan.status.charAt(0).toUpperCase() +
              subscription.currentPlan.status.slice(1)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Start Date</span>
          <span>
            {new Date(subscription.currentPlan.startDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">End Date</span>
          <span>
            {new Date(subscription.currentPlan.endDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Days Remaining</span>
          <span className={daysRemaining <= 30 ? "text-red-600 font-bold" : ""}>
            {daysRemaining} days
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Auto Renew</span>
          <span
            className={
              subscription.currentPlan.autoRenew
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {subscription.currentPlan.autoRenew ? "Enabled" : "Disabled"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Price</span>
          <span className="font-semibold">
            ${subscription.currentPlan.price}/month
          </span>
        </div>

        <div className="pt-6 flex gap-4">
          {subscription.currentPlan.status === "active" ? (
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
            >
              Cancel Subscription
            </button>
          ) : (
            <button
              onClick={onRenew}
              className="flex-1 px-4 py-2 bg-primary_color text-white rounded-lg hover:opacity-90"
            >
              Renew Subscription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// components/PlanCard.tsx
interface PlanCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, isCurrentPlan, onSelect }: PlanCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col">
      <h3 className="text-xl font-bold">{plan.name}</h3>
      <div className="mt-4">
        <span className="text-3xl font-bold">${plan.price}</span>
        <span className="text-gray-600">/month</span>
      </div>
      <p className="text-gray-600 mt-2">{plan.duration} months duration</p>

      <div className="mt-6 space-y-4 flex-grow">
        {plan.features.map((feature) => (
          <div key={feature.id} className="flex items-center space-x-2">
            {feature.included ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
            <span
              className={feature.included ? "text-gray-900" : "text-gray-500"}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        disabled={isCurrentPlan}
        className={`mt-6 w-full px-4 py-2 rounded-lg ${
          isCurrentPlan
            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
            : "bg-primary_color text-white hover:opacity-90"
        }`}
      >
        {isCurrentPlan ? "Current Plan" : "Select Plan"}
      </button>
    </div>
  );
};

// pages/doctor/[id]/subscription.tsx

const DoctorSubscriptionPage = () => {
  const doctorSubscription: DoctorSubscription = {
    doctorId: "DOC001",
    doctorName: "Dr. John Smith",
    currentPlan: {
      name: "Premium",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      status: "active",
      autoRenew: true,
      price: 299
    }
  };

  const handleRenew = () => {
    // Handle renewal logic
    console.log("Renewing subscription");
  };

  const handleCancel = () => {
    // Handle cancellation logic
    console.log("Cancelling subscription");
  };

  const handleSelectPlan = (planId: string) => {
    // Handle plan selection logic
    console.log("Selected plan:", planId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Subscription Details</h1>
          <div className="text-gray-600">
            Doctor ID: {doctorSubscription.doctorId}
          </div>
        </div>

        {/* Current Plan */}
        <CurrentPlanCard
          subscription={doctorSubscription}
          onRenew={handleRenew}
          onCancel={handleCancel}
        />

        {/* Available Plans */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={
                  plan.name === doctorSubscription.currentPlan.name
                }
                onSelect={handleCancel}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSubscriptionPage;
