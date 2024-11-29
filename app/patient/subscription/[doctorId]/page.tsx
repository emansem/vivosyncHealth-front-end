"use client";
// pages/doctor/[id]/subscription.tsx
import { useState } from "react";
import { ArrowLeft, Calendar, CreditCard, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

// Types for our subscription data
interface SubscriptionDetails {
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
const availablePlans = [
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
  const router = useRouter();

  // Simulated subscription data - in real app, fetch this based on router.query.id
  const [subscription] = useState<SubscriptionDetails>({
    doctorName: "Bung Cendrick",
    doctorId: "D799598",
    currentPlan: "basic",
    startDate: "11/28/2024",
    endDate: "12/28/2024",
    amount: 100,
    status: "Active",
    autoRenew: true
  });

  // Function to handle plan upgrades
  const handleUpgrade = (planName: string) => {
    // Add your upgrade logic here
    console.log(`Upgrading to ${planName}`);
  };

  return (
    <div className=" bg-gray-50">
      {/* Header Section */}

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Current Subscription Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col gap-3 md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Subscription Details
              </h1>
              <p className="text-gray-600">
                Manage subscription for Dr. {subscription.doctorName}
              </p>
            </div>
            <div className="flex gap-3">
              {subscription.status === "Active" && (
                <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                  Cancel Plan
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Plan Card */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-5 h-5 text-[#269c65]" />
                <h3 className="text-lg font-medium">Current Plan</h3>
              </div>
              <p className="text-2xl font-semibold mb-2 capitalize">
                {subscription.currentPlan}
              </p>
              <p className="text-gray-600">${subscription.amount}/month</p>
            </div>

            {/* Billing Period Card */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-[#269c65]" />
                <h3 className="text-lg font-medium">Billing Period</h3>
              </div>
              <p className="text-gray-600 mb-1">
                Started: {subscription.startDate}
              </p>
              <p className="text-gray-600">Ends: {subscription.endDate}</p>
            </div>

            {/* Auto-Renewal Card */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-5 h-5 text-[#269c65]" />
                <h3 className="text-lg font-medium">Auto-Renewal</h3>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Status</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscription.autoRenew}
                    className="sr-only peer"
                    onChange={() => {}} // Add your handler here
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#269c65]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#269c65]"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Plan Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Plan Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-4 ${
                  plan.name === subscription.currentPlan
                    ? "border-[#269c65] bg-[#269c65]/5"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">{plan.displayName}</h3>
                    <p className="text-gray-600">${plan.price}/month</p>
                  </div>
                  {plan.name === subscription.currentPlan ? (
                    <span className="bg-[#269c65] text-white text-xs px-2 py-1 rounded-full">
                      Current
                    </span>
                  ) : (
                    subscription.currentPlan === "basic" &&
                    plan.name !== "basic" && (
                      <button
                        onClick={() => handleUpgrade(plan.name)}
                        className="bg-[#269c65] text-white text-sm px-3 py-1 rounded-lg hover:bg-opacity-90"
                      >
                        Upgrade
                      </button>
                    )
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-[#269c65]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorSubscriptionPage;
