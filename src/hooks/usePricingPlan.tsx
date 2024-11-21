"use client";
import { SUBSCRIPTION_PLAN_INPUTS_FIELD } from "@/app/lib/constant";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

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
  const [errorMessage, setErrorMessage] = useState("");

  //Subscription plan features
  const [planfeatures, setPlanFeatures] = useState<PlanFeatures[]>([
    INITIAL_FEATURE
  ]);

  //Subscription plan select options values
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({
    planType: "",
    refundDays: "",
    refundAnswer: ""
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
  console.log(planfeatures);

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

  //Check if the doctor allow refund
  const refundAnswer = selectedValues.refundAnswer;
  const isRefundEnabled = refundAnswer === "yes";

  return {
    handleAddNewFeacture,
    planfeatures,
    handleOnchangePlanFeature,
    handleOnselectOPtion,
    isRefundEnabled,
    selectedValues,
    errorMessage,
    handleOnchangePlanInputsField
  };
}

export default usePricingPlan;
