"use client";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useApiPost,
  useDeleteData,
  useGetData,
  useUpdateData
} from "./serviceHook";
import { DOCTOR_API_END_POINTS, GET_ALL_PLANS_KEY } from "@/app/lib/constant";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { closeModal } from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";

export type PlanFeatures = {
  id: number;
  value: string;
};

interface SelectedValuesType {
  refundDays: string;
  refundAnswer: "yes" | "no" | "";
  planDuration: "30" | "1";
  plan_status: "active" | "inactive";
  planType: "basic" | "standard" | "premium" | undefined;
}
export interface PlanInputsFieldTypes {
  name: string;
  amount: number;
  discount_percentage: number;
}
interface InitialFeature {
  id: number;
  value: string;
}

/**
 * Custom hook to manage plan input fields (name, amount, discount)
 * Handles form state and updates for basic plan details
 */
const usePlanInputsField = (INITIAL_VALUE?: PlanInputsFieldTypes) => {
  // Initial state setup
  const [planInputsValue, setPlanInputsValue] = useState<PlanInputsFieldTypes>({
    name: INITIAL_VALUE?.name || "",
    amount: INITIAL_VALUE?.amount || 0,
    discount_percentage: INITIAL_VALUE?.discount_percentage || 0
  });

  // Add this useEffect to update planInputsValue when INITIAL_VALUE changes
  useEffect(() => {
    if (INITIAL_VALUE) {
      setPlanInputsValue({
        name: INITIAL_VALUE.name || "",
        amount: INITIAL_VALUE.amount || 0,
        discount_percentage: INITIAL_VALUE.discount_percentage || 0
      });
    }
  }, [INITIAL_VALUE]);

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
  const INITIAL_FEATURE = {
    value: "",
    id: Date.now()
  };
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
    planType: "basic",
    refundDays: "",
    refundAnswer: "",
    planDuration: "30",
    plan_status: "active"
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

  // //Rest the form inputs value after successfull response from the api
  // const resetForm = () => {

  // };

  // Handle form submission and validation
  const handleSubmitPlanForm = () => {
    // Construct plan data from all form states
    const planData: SubscriptionPlanDataType = {
      amount: planInputsValue.amount,
      name: planInputsValue.name,
      discount_percentage: planInputsValue.discount_percentage,
      plan_type: selectedValues.planType,
      plan_status: selectedValues.plan_status,
      plan_duration: selectedValues.planDuration,
      isRefundEnabled: selectedValues.refundAnswer,
      refund_period: selectedValues.refundDays,
      plan_features: planfeatures
    };

    // Validate required fields
    if (!planData.name) {
      toast.error("Plan name is required");
      return;
    } else if (planData.amount <= 0) {
      toast.error("Plan amount must be greater than 0");
      return;
    } else if (planData.plan_features.some((value) => !value.value)) {
      toast.error("Plan feature cannot be empty");
      return;
    } else if (!planData.isRefundEnabled) {
      toast.error("Please select if you want to allow refund");
      return;
    }

    // Submit if validation passes
    mutate(planData, {
      onSuccess: () => {
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

//A custom hook to get the doctor subscription plan by id
interface GetPlanApiResponse {
  data: {
    plan: SubscriptionPlanDataType;
  };
}
export const useGetSubscriptionPlanData = () => {
  const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.getPlan}/42`;
  const queryKey = "plan";
  const { data, isLoading, isError, error, isSuccess } =
    useGetData<GetPlanApiResponse>(apiEndpoint, queryKey);
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data.message || "Something went wrong, please try gain"
    );
  }
  return { data, isError, isLoading };
};
export default usePricingPlan;

//A custom hook to update the doctor subscription plan
export const useUpdateSubscriptionPlan = () => {
  const { handleOnselectOPtion, selectedValues, isRefundEnabled } =
    useSelectPlanInputs();

  // Provide initial empty values
  const [formData, setFormData] = useState<PlanInputsFieldTypes>({
    name: "",
    amount: 0,
    discount_percentage: 0
  });
  const updatePlanEndPoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.updatePlan}/41`;
  const { mutate, isPending } = useUpdateData(updatePlanEndPoint);

  const { handleOnchangePlanInputsField, planInputsValue } =
    usePlanInputsField(formData);
  const { data, isLoading } = useGetSubscriptionPlanData();
  const { planfeatures, setPlanFeatures, handleOnchangePlanFeature } =
    usePlanFeatures();

  const planTypeLowerCase = data?.data.plan.plan_type as string;
  const planType =
    planTypeLowerCase?.charAt(0).toUpperCase() + planTypeLowerCase?.slice(1);

  useEffect(() => {
    if (data?.data?.plan) {
      const { name, amount, discount_percentage, plan_features } = data.data
        .plan as SubscriptionPlanDataType;

      // Set form data
      setFormData({
        name,
        amount,
        discount_percentage
      });

      // Set all features at once instead of mapping
      if (plan_features?.length > 0) {
        setPlanFeatures(
          plan_features.map((item) => ({
            id: item.id,
            value: item.value
          }))
        );
      }
    }
  }, [data]);

  //Prepare the inputs field to send to the server
  const subscriptionPlanUpdateData: SubscriptionPlanDataType = {
    name: planInputsValue.name.trim(),
    amount: planInputsValue.amount,
    discount_percentage: planInputsValue.discount_percentage,
    plan_features: planfeatures,
    plan_type: data?.data.plan.plan_type,
    refund_period: selectedValues.refundDays,
    isRefundEnabled: selectedValues.refundAnswer,
    plan_status: selectedValues.plan_status,
    plan_duration: selectedValues.planDuration
  };

  //After successfully collecting the inputs field, submit the updated data to the server
  const handleSubmitPlanUpdateData = () => {
    if (!subscriptionPlanUpdateData.isRefundEnabled) {
      toast.error("Please choose if you want to allow refund ");
      return;
    }
    mutate(subscriptionPlanUpdateData);
    console.log(subscriptionPlanUpdateData);
  };

  return {
    isRefundEnabled,
    handleOnselectOPtion,
    planfeatures,
    planType,
    isLoading,
    handleSubmitPlanUpdateData,
    planInputsValue,
    isPending,
    handleOnchangePlanFeature,
    handleOnchangePlanInputsField
  };
};

//A custom hook to get all doctor's subscription plan
interface GetPlansApiResponse {
  data: {
    plans: SubscriptionPlanDataType[];
  };
}
export const useGetAllSubscriptionPlansData = () => {
  const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.getAllPlan}`;
  console.log(apiEndpoint);
  const { data, isLoading } = useGetData<GetPlansApiResponse>(
    apiEndpoint,
    GET_ALL_PLANS_KEY
  );

  console.log("All plan data", data);
  return { isLoading, data };
};

export const useDeleteSubscriptionPlan = () => {
 
  const { planId } = useAppSelector((state) => state.subscriptionPlan);
  const apiEndpoint = DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.deletePlan;
  const { mutate, isPending } = useDeleteData(apiEndpoint, GET_ALL_PLANS_KEY);
  const handleSubmitDeletePlan = () => {
    if (!planId) return;
    mutate(planId);
  };
  return { planId, handleSubmitDeletePlan, isPending };
};
