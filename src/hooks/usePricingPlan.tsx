"use client";
import { useState } from "react";
import useRegister from "./authentication/useRegisterForm";
type PlanFeatures = {
  id: number;
  value: string;
};

const INITIAL_FEATURE: PlanFeatures = {
  value: "",
  id: Date.now()
};
function usePricingPlan() {
  const [planfeatures, setPlanFeatures] = useState<PlanFeatures[]>([
    INITIAL_FEATURE
  ]);
  const { value, onSelect: handReFundChange } = useRegister();

  const handleAddNewFeacture = () => {
    setPlanFeatures((prev) => [...prev, { value: "", id: Date.now() }]);
  };
  const refundAnswear = value;
  const refundDays = value;

  const isRefundEnabled = refundAnswear === "yes";
  console.log(refundAnswear);
  return {
    handleAddNewFeacture,
    planfeatures,
    handReFundChange,
    isRefundEnabled,
    refundAnswear,
    refundDays
  };
}

export default usePricingPlan;
