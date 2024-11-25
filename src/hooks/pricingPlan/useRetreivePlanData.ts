"use client";

import toast from "react-hot-toast";
import { DOCTOR_API_END_POINTS, GET_ALL_PLANS_KEY } from "@/app/lib/constant";
import axios from "axios";
import { useAppSelector } from "@/app/lib/hooks";
import { useGetData, useDeleteData } from "../serviceHook";
import { GetPlanApiResponse, GetPlansApiResponse } from "./useUtileHook";

// Hook to fetch a single subscription plan by ID
export const useGetSubscriptionPlanData = (id: string) => {
    // Create API endpoint with plan ID
    const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.getPlan}/${id}`;
    const queryKey = "plan";

    // Fetch plan data
    const { data, isLoading, isError, error } =
        useGetData<GetPlanApiResponse>(apiEndpoint, queryKey);

    // Show error toast if API call fails
    if (axios.isAxiosError(error)) {
        toast.error(
            error.response?.data.message || "Something went wrong, please try gain"
        );
    }
    return { data, isError, isLoading };
};


// Hook to fetch all subscription plans
export const useGetAllSubscriptionPlansData = () => {
    const apiEndpoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.getAllPlan}`;
    console.log(apiEndpoint);

    // Fetch all plans
    const { data, isLoading } = useGetData<GetPlansApiResponse>(
        apiEndpoint,
        GET_ALL_PLANS_KEY
    );

    console.log("All plan data", data);
    return { isLoading, data };
};

// Hook to handle subscription plan deletion
export const useDeleteSubscriptionPlan = () => {
    // Get plan ID from Redux store
    const { planId } = useAppSelector((state) => state.subscriptionPlan);

    // Setup delete API call
    const apiEndpoint = DOCTOR_API_END_POINTS.SUBSCRIPTION_PLAN.deletePlan;
    const { mutate, isPending } = useDeleteData(apiEndpoint, GET_ALL_PLANS_KEY);

    // Handle plan deletion
    const handleSubmitDeletePlan = () => {
        if (!planId) return;
        mutate(planId);
    };
    return { planId, handleSubmitDeletePlan, isPending };
};
