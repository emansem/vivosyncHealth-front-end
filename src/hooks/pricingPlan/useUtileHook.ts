import { SubscriptionPlanDataType } from "@/app/lib/types";
import { useState, useEffect, ChangeEvent } from "react";


export type PlanFeatures = {
    id: number;
    value: string;
};

export interface SelectedValuesType {
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

export interface GetPlanApiResponse {
    data: {
        plan: SubscriptionPlanDataType;
    };
}
// Type for multiple plans API response
export interface GetPlansApiResponse {
    data: {
        plans: SubscriptionPlanDataType[];
    };
}

// Interface for hook parameters
export interface SubmitPlanData {
    planInputsValue: PlanInputsFieldTypes;
    planfeatures: PlanFeatures[];
    plan_type?: "basic" | "standard" | "premium";
    selectedValues: SelectedValuesType;
    id?: string;
}
/**
 * Custom hook to manage plan input fields (name, amount, discount)
 * Handles form state and updates for basic plan details
 */
export const usePlanInputsField = (INITIAL_VALUE?: PlanInputsFieldTypes) => {
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
export const usePlanFeatures = () => {
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
export const useSelectPlanInputs = () => {
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