import { CheckCircle } from "lucide-react";
import { SubscriptionPlanDataType } from "@/app/lib/types";

// Order Summary component
export const OrderSummary = ({
  selectedPlan
}: {
  selectedPlan: SubscriptionPlanDataType;
}) => {
  return (
    <div className="bg-gray-50 p-8 rounded-lg space-y-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <div>
            <p className="font-medium capitalize">{selectedPlan?.plan_type}</p>
            <p className="text-sm text-gray-600">
              {selectedPlan?.plan_duration === "30" ? "Monthly" : "Annually"}
            </p>
          </div>
          <span className="font-medium">${selectedPlan?.amount || 0}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${selectedPlan?.amount || 0}</span>
          </div>
          {/* <div className="flex justify-between mt-2">
            <span className="text-gray-600">Tax</span>
            <span>${(selectedPlan.price * 0.1).toFixed(2)}</span>
          </div> */}
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Discount</span>
            <span>
              $
              {(Number(selectedPlan?.discount_percentage) * 0.1).toFixed(2) ||
                0}
            </span>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>
              $
              {(
                selectedPlan?.amount -
                Number(selectedPlan?.discount_percentage) * 0.1
              ).toFixed(2) || 0}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Billed
            {selectedPlan?.plan_duration === "30" ? " Monthly" : " Annually"}
          </p>
        </div>
      </div>

      {/* Features included */}
      <div className="space-y-3">
        <p className="font-medium">Plan Features:</p>
        {selectedPlan?.plan_features?.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 text-gray-600"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>{feature.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
