import React, { useState } from "react";
import { THEME } from "../page";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { SubscriptionPlanDataType } from "@/app/lib/types";
interface PricingPlanSectionProps {
  plans: SubscriptionPlanDataType[];
}
function PricingPlanSection({ plans }: PricingPlanSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  return (
    <div className="lg:w-[400px] mt-6 lg:mt-0">
      <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`flex-1 capitalize py-2 px-4 rounded-lg text-sm font-medium transition-all
                    ${
                      selectedPlan === plan.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
            >
              {plan.plan_type}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {plans.map(
            (plan) =>
              plan.id === selectedPlan && (
                <motion.div
                  key={plan.id}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold capitalize">
                        {plan.name}
                      </h3>
                      <p className="text-green-600">
                        save up to {plan.discount_percentage}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">${plan.amount}</div>
                      <div className="text-gray-500">
                        /{plan.plan_duration === "1" ? "Year" : "month"}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plan.plan_features.map((feature) => (
                      <div key={feature.id} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 shrink-0"
                          style={{ color: THEME.colors.success }}
                        />
                        <span className="text-gray-600">{feature.value}</span>
                      </div>
                    ))}
                  </div>

                  <PrimaryButton backgroud color="text-white">
                    Subscribe Now
                  </PrimaryButton>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PricingPlanSection;
