"use client";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { useApiPost } from "./serviceHook";
export type PlanFeatures = {
  id: number;
  value: string;
};

const INITIAL_FEATURE = {
  value: "",
  id: Date.now()
};
interface SelectedValuesType {
  refundDays: string;
  refundAnswer: "yes" | "no" | "";
  planDuration: "";
  planType: string; // Consider camelCase for consistency
}
interface PlanInputsField {
  planName: string;
  planAmount: number;
  discountPercentage: number;
}

function usePricingPlan() {
  //Plan inputs field valu
  const [planInputsValue, setPlanInputsValue] = useState<PlanInputsField>({
    planName: "",
    planAmount: 0,
    discountPercentage: 0
  });

  const { mutate, isPending } = useApiPost<
    SubscriptionPlanDataType,
    SubscriptionPlanDataType
  >("/doctors/create-plan");

  //Subscription plan features
  const [planfeatures, setPlanFeatures] = useState<PlanFeatures[]>([
    INITIAL_FEATURE
  ]);

  //Subscription plan select options values
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({
    planType: "",
    refundDays: "",
    refundAnswer: "",
    planDuration: ""
  });

  //Add new plan feature input
  const handleAddNewFeacture = () => {
    setPlanFeatures((prev) => [...prev, { value: "", id: Date.now() }]);
  };

  //Get the plan feature value
  const handleOnchangePlanFeature = (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const { value } = e.target;
    setPlanFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, value } : feature
      )
    );
  };

  //Get the subscription plan selected option value
  const handleOnselectOPtion = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  //Get plan inputs field value
  const handleOnchangePlanInputsField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInputsValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPlanForm = () => {
    const planData: SubscriptionPlanDataType = {
      planAmount: planInputsValue.planAmount,
      planName: planInputsValue.planName,
      discountPercentage: planInputsValue.discountPercentage,
      planType: selectedValues.planType,
      planDuration: selectedValues.planDuration,
      isRefundEnabled: selectedValues.refundAnswer,
      refundDays: selectedValues.refundDays,
      planFeatures: planfeatures
    };

    if (!planData.planName) {
      toast.error("Plan name is required");
      return;
    } else if (planData.planAmount <= 0) {
      toast.error("Plan amount must be greater than 0");
    } else if (planData.planFeatures.some((value) => value.value === "")) {
      toast.error("Plan feature cannot be empty");
      return;
    } else if (!planData.isRefundEnabled) {
      toast.error("Please select if you want to allow refund");
      return;
    }

    mutate(planData);
  };
  //Check if the doctor allow refund
  const refundAnswer = selectedValues.refundAnswer;
  const isRefundEnabled = refundAnswer === "yes";

  return {
    handleAddNewFeacture,
    handleSubmitPlanForm,
    planfeatures,
    handleOnchangePlanFeature,
    handleOnselectOPtion,
    isRefundEnabled,
    isPending,
    selectedValues,
    handleOnchangePlanInputsField
  };
}

export default usePricingPlan;
