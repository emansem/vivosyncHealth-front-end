// Import necessary dependencies and types
import { SubscriptionPlanDataType } from "@/app/lib/types";
import toast from "react-hot-toast";
import { useApiPost } from "../serviceHook";
import { PlanFeatures, SubmitPlanData, usePlanFeatures, usePlanInputsField, useSelectPlanInputs } from "./useUtileHook";
import { DOCTOR_API_END_POINTS } from "@/app/lib/constant";

// Interface for validation props
interface ValidatePlanProps {
    name: string,
    amount: number,
    plan_features: PlanFeatures[],
    isRefundEnabled: "yes" | "no" | ""
}

/**
 * Validates subscription plan input fields
 * Checks for required fields and valid values
 */
const validateSubscriptionPlanInputs = ({
    name,
    amount,
    plan_features,
    isRefundEnabled
}: ValidatePlanProps) => {
    // Check for empty plan name
    if (!name) {
        toast.error("Plan name is required");
        return false
    }
    // Validate amount is positive
    else if (amount <= 0) {
        toast.error("Plan amount must be greater than 0");
        return false
    }
    // Check if any plan feature is empty
    else if (plan_features.some((value) => !value.value)) {
        toast.error("Plan feature cannot be empty");
        return false
    }
    // Verify refund option is selected
    else if (!isRefundEnabled) {
        toast.error("Please select if you want to allow refund");
        return false
    }
    return true
}

/**
 * Hook for handling subscription plan data submission
 * Manages API calls and form validation
 */
const useSubmitSubscriptionPlanData = ({
    planInputsValue,
    planfeatures,
    selectedValues,
}: SubmitPlanData) => {
    // Setup API endpoint for plan creation
    const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.create}`;

    // Initialize API mutation hook with type safety
    const { mutate, isPending } = useApiPost<
        SubscriptionPlanDataType,
        SubscriptionPlanDataType
    >(apiEndpoint);

    // Prepare subscription plan data for submission
    const subscriptionPlanData: SubscriptionPlanDataType = {
        name: planInputsValue.name.trim(),
        amount: planInputsValue.amount,
        discount_percentage: planInputsValue.discount_percentage,
        plan_features: planfeatures,
        plan_type: selectedValues.planType,
        refund_period: selectedValues.refundDays,
        isRefundEnabled: selectedValues.refundAnswer,
        plan_status: selectedValues.plan_status,
        plan_duration: selectedValues.planDuration
    };

    // Handle form submission with validation
    const handleSubmitPlanForm = () => {
        const isInputValid = validateSubscriptionPlanInputs({
            name: planInputsValue.name,
            amount: planInputsValue.amount,
            plan_features: planfeatures,
            isRefundEnabled: selectedValues.refundAnswer
        });

        if (isInputValid) {
            mutate(subscriptionPlanData, {
                onSuccess: (result) => {
                    toast.success(result.data.message)
                    setTimeout(() => window.location.reload(), 600);
                }
            });
        }
    };

    return { handleSubmitPlanForm, isPending };
};

/**
 * Main hook for managing subscription plan creation
 * Combines all form management hooks and handles state
 
 */
export default function useCreateSubscriptionPlan() {
    // Initialize feature management hooks
    const {
        planfeatures,
        handleAddNewFeacture,
        handleOnchangePlanFeature
    } = usePlanFeatures();

    // Initialize plan options selection hooks
    const {
        isRefundEnabled,
        handleOnselectOPtion,
        selectedValues
    } = useSelectPlanInputs();

    // Initialize form input management hooks
    const {
        planInputsValue,
        handleOnchangePlanInputsField
    } = usePlanInputsField();

    // Initialize form submission hooks
    const { handleSubmitPlanForm, isPending } = useSubmitSubscriptionPlanData({
        planfeatures,
        planInputsValue,
        selectedValues
    })

    // Return all necessary handlers and state
    return {
        // Feature management
        handleAddNewFeacture,
        planfeatures,
        handleOnchangePlanFeature,

        // Form submission
        handleSubmitPlanForm,
        isPending,

        // Plan options
        handleOnselectOPtion,
        isRefundEnabled,
        selectedValues,

        // Input field management
        handleOnchangePlanInputsField
    };
}