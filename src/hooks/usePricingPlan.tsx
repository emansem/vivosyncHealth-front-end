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

/**
 * Custom hook to manage plan input fields (name, amount, discount)
 * Handles form state and updates for basic plan details
 */
const usePlanInputsField = () => {
  const [planInputsValue, setPlanInputsValue] = useState<PlanInputsField>({
    planName: "",
    planAmount: 0,
    discountPercentage: 0
  });

  // Updates plan input fields based on user input
  const handleOnchangePlanInputsField = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlanInputsValue((prev) => ({ ...prev, [name]: value }));
  };

  return { handleOnchangePlanInputsField, setPlanInputsValue, planInputsValue };
};

/**
 * Custom hook to manage plan features
 * Handles adding and updating feature list items
 */
const usePlanFeatures = () => {
  const [planfeatures, setPlanFeatures] = useState<PlanFeatures[]>([
    INITIAL_FEATURE
  ]);

  // Adds a new empty feature input field
  const handleAddNewFeacture = () => {
    setPlanFeatures((prev) => [...prev, { value: "", id: Date.now() }]);
  };

  // Updates specific feature value by ID
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

  return {
    handleOnchangePlanFeature,
    setPlanFeatures,
    handleAddNewFeacture,
    planfeatures
  };
};

/**
 * Custom hook to manage plan selection options
 * Handles plan type, refund settings, and duration
 */
const useSelectPlanInputs = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>({
    planType: "",
    refundDays: "",
    refundAnswer: "",
    planDuration: ""
  });

  // Updates select input values
  const handleOnselectOPtion = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  // Derived state to check if refunds are enabled
  const refundAnswer = selectedValues.refundAnswer;
  const isRefundEnabled = refundAnswer === "yes";

  return {
    handleOnselectOPtion,
    setSelectedValues,
    isRefundEnabled,
    selectedValues
  };
};

/**
 * Main hook for managing subscription plan creation
 * Combines form state, validation, and API submission
 */
function usePricingPlan() {
  // Import form management hooks
  const {
    planfeatures,
    setPlanFeatures,
    handleAddNewFeacture,
    handleOnchangePlanFeature
  } = usePlanFeatures();
  const {
    isRefundEnabled,
    setSelectedValues,
    handleOnselectOPtion,
    selectedValues
  } = useSelectPlanInputs();
  const { planInputsValue, setPlanInputsValue, handleOnchangePlanInputsField } =
    usePlanInputsField();

  // API mutation hook for plan creation
  const { mutate, reset, isPending } = useApiPost<
    SubscriptionPlanDataType,
    SubscriptionPlanDataType
  >("/doctors/create-plan");

  //Rest the form inputs value after successfull response from the api
  const resetForm = () => {
    setPlanFeatures([INITIAL_FEATURE]);
    setSelectedValues({
      planType: "",
      refundDays: "",
      refundAnswer: "",
      planDuration: ""
    });
    setPlanInputsValue({
      planName: "",
      planAmount: 0,
      discountPercentage: 0
    });
  };

  // Handle form submission and validation
  const handleSubmitPlanForm = () => {
    // Construct plan data from all form states
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

    // Validate required fields
    if (!planData.planName) {
      toast.error("Plan name is required");
      return;
    }
    if (planData.planAmount <= 0) {
      toast.error("Plan amount must be greater than 0");
      return;
    }
    if (planData.planFeatures.some((value) => !value.value)) {
      toast.error("Plan feature cannot be empty");
      return;
    }
    if (!planData.isRefundEnabled) {
      toast.error("Please select if you want to allow refund");
      return;
    }

    // Submit if validation passes
    mutate(planData, {
      onSuccess: () => {
        resetForm();
        window.location.reload();
        reset();
      }
    });
  };

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
