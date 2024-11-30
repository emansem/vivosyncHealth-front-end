import { SubscriptionData, SubscriptionPlanDataType } from "@/app/lib/types";

interface SubscriptionPlanProps {
  subscriptionPlans: SubscriptionPlanDataType[];
  current_subscription: SubscriptionData;
}

function SubscriptionPlan({
  subscriptionPlans,
  current_subscription
}: SubscriptionPlanProps) {
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

        {/* Plan Features */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Plan Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-lg p-4 ${
                  plan.plan_type === current_subscription.plan_type
                    ? "border-[#269c65] bg-[#269c65]/5"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium capitalize">
                      {plan.plan_type}
                    </h3>
                    <p className="text-gray-600">${plan.amount}/month</p>
                  </div>
                  {plan.plan_type === current_subscription.plan_type ? (
                    <span className="bg-[#269c65] text-white text-xs px-2 py-1 rounded-full">
                      Current
                    </span>
                  ) : (
                    <a
                      href={`http://localhost:3000/patient/checkout/${plan.id}`}
                    >
                      <button
                        onClick={() => handleUpgrade(plan.name)}
                        className="bg-[#269c65] text-white text-sm px-3 py-1 rounded-lg hover:bg-opacity-90"
                      >
                        Upgrade
                      </button>
                    </a>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.plan_features.map((feature) => (
                    <li
                      key={feature.id}
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
                      {feature.value}
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
}

export default SubscriptionPlan;
