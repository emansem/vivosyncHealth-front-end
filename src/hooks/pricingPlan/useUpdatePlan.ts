import { DOCTOR_API_END_POINTS } from "@/app/lib/constant";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useUpdateData } from "../serviceHook";
import { usePlanInputsField, usePlanFeatures, useSelectPlanInputs, GetPlanApiResponse, PlanInputsFieldTypes, SubmitPlanData } from "./useUtileHook";
import { useGetSubscriptionPlanData } from "./useRetreivePlanData";



// Hook to manage and initialize subscription plan form state
const useUpdateSubscriptionPlanInitialState = (data: GetPlanApiResponse) => {
    // Initialize form state with empty values
    const [formData, setFormData] = useState<PlanInputsFieldTypes>({
        name: "",
        amount: 0,
        discount_percentage: 0
    });

    // Get handlers for input field changes and current form values
    const { handleOnchangePlanInputsField, planInputsValue } =
        usePlanInputsField(formData);

    // Get handlers and state for plan features management
    const { planfeatures, setPlanFeatures, handleOnchangePlanFeature } =
        usePlanFeatures();

    // Update form data and features when plan data is available
    useEffect(() => {
        if (data?.data?.plan) {
            // Extract required fields from plan data
            const { name, amount, discount_percentage, plan_features } = data.data
                .plan as SubscriptionPlanDataType;

            // Update basic form fields
            setFormData({
                name,
                amount,
                discount_percentage
            });

            // Update plan features if they exist
            if (plan_features?.length > 0) {
                setPlanFeatures(
                    plan_features.map((item) => ({
                        id: item.id,
                        value: item.value
                    }))
                );
            }
        }
    }, [data]); // Re-run when data changes

    return {
        planInputsValue,
        handleOnchangePlanFeature,
        handleOnchangePlanInputsField,
        planfeatures
    };
};

const useSubmitSubscriptionPlanData = ({
    planInputsValue,
    planfeatures,
    plan_type,
    selectedValues,
    id
}: SubmitPlanData) => {
    // API endpoint for updating plan
    const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.updatePlan}/${id}`;

    // Setup mutation
    const { mutate, isPending } = useUpdateData(apiEndpoint);

    // Prepare data for submission
    const subscriptionPlanData: SubscriptionPlanDataType = {
        name: planInputsValue.name.trim(),
        amount: planInputsValue.amount,
        discount_percentage: planInputsValue.discount_percentage,
        plan_features: planfeatures,
        plan_type,
        refund_period: selectedValues.refundDays,
        isRefundEnabled: selectedValues.refundAnswer,
        plan_status: selectedValues.plan_status,
        plan_duration: selectedValues.planDuration
    };

    // Handle submission
    const handleSubmit = () => {
        if (!subscriptionPlanData.isRefundEnabled) {
            toast.error("Please choose if you want to allow refund");
            return;
        }
        mutate(subscriptionPlanData);
    };

    return { handleSubmit, isPending };
};
// Hook to update an existing subscription plan
export const useUpdateSubscriptionPlan = (id: string) => {
    // Get selection handlers and states
    const { handleOnselectOPtion, selectedValues, isRefundEnabled } =
        useSelectPlanInputs();

    // Fetch current plan data
    const { data, isLoading } = useGetSubscriptionPlanData(id);

    // Get form state and handlers
    const {
        planInputsValue,
        handleOnchangePlanFeature,
        handleOnchangePlanInputsField,
        planfeatures
    } = useUpdateSubscriptionPlanInitialState(data as GetPlanApiResponse);

    // Get submit handler and loading state
    const { handleSubmit, isPending } = useSubmitSubscriptionPlanData({
        planInputsValue,
        planfeatures,
        plan_type: data?.data?.plan?.plan_type || 'basic',
        selectedValues,
        id
    });

    // Format plan type for display
    const planTypeLowerCase = data?.data?.plan?.plan_type as string;
    const planType = planTypeLowerCase?.charAt(0).toUpperCase() +
        planTypeLowerCase?.slice(1);

    return {
        // Form state
        planInputsValue,
        planfeatures,
        planType,

        // Loading states
        isLoading,
        isPending,

        // Handlers
        handleOnselectOPtion,
        handleOnchangePlanFeature,
        handleOnchangePlanInputsField,
        handleSubmitPlanUpdateData: handleSubmit,

        // Other states
        isRefundEnabled
    };
};