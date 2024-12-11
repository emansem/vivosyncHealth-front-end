import { Shield, Calendar, CreditCard } from "lucide-react";

import { SubscriptionData } from "@/app/lib/types";
import { formatDate } from "@/src/helper/helper";
interface CurrentSubscriptionProps {
  subscription: SubscriptionData;
  handleCancelSubscription: () => void;
  isPending: boolean;
}

function CurrentSubscription({
  subscription,
  isPending,
  handleCancelSubscription
}: CurrentSubscriptionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Subscription Details
          </h1>
          <p className="text-gray-600">
            Manage subscription for Dr. {subscription.doctor_name}
          </p>
        </div>
        <div className="flex gap-3">
          {subscription.subscription_status === "active" && (
            <button
              onClick={handleCancelSubscription}
              disabled={isPending}
              className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
            >
              {isPending ? "Cancelling...." : " Cancel Plan"}
            </button>
          )}
          {subscription.subscription_status === "expired" && (
            <a
              href={`http://localhost:3000/patient/checkout/${subscription.plan_id}`}
            >
              <button
                onClick={handleCancelSubscription}
                disabled={isPending}
                className="px-4 py-2 border border-primary_color text-secondary_color rounded-lg hover:bg-primary_color/10"
              >
                Renew Plan
              </button>
            </a>
          )}
          {subscription.subscription_status === "cancelled" && (
            <a
              href={`http://localhost:3000/patient/checkout/${subscription.plan_id}`}
            >
              <button className="px-4 py-2 border border-primary_color text-secondary_color rounded-lg hover:bg-primary_color/10">
                Reactivate Plan
              </button>
            </a>
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
          <p className="text-2xl font-semibold mb-2 capitalize ">
            {subscription.plan_type}
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
            Started: {formatDate(subscription.created_at)}
          </p>
          <p className="text-gray-600">
            Ends: {formatDate(subscription.expire_date as string)}
          </p>
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
                checked={subscription.auto_renew}
                className="sr-only peer"
                onChange={() => {}} // Add your handler here
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#269c65]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#269c65]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentSubscription;
