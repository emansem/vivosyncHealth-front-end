import { PATIENT_API_ENDPOINTS } from "@/app/lib/constant"
import { useApiPost, useGetData, useUpdateData } from "./serviceHook"
import { GetPlanApiResponse } from "./pricingPlan/useUtileHook";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SubscriptionData, SubscriptionPlanDataType } from "@/app/lib/types";

// Type definition for subscription payment data
interface SubscriptionPayment {
    phone_number: number,
    payment_method: string
}
interface SubscriptionDataApiResponse {
    data: {
        subscription: SubscriptionData[]
    }
}
interface SubscriptionDataWithPlan {
    data: {
        current_subscription: SubscriptionData,
        subscription_plans: SubscriptionPlanDataType[]
    }
}

export const useSubscription = (planId: string, selectedMethod: string) => {
    // API endpoints construction 
    const apiEndPoint = `${PATIENT_API_ENDPOINTS.PLAN.getDoctorPlan}/${planId}`
    const makePaymentApiEndpoint = `${PATIENT_API_ENDPOINTS.PAYMENT.collect}/${planId}`

    // Fetch plan details
    const { data, isLoading, error } = useGetData<GetPlanApiResponse>(apiEndPoint, "plan");

    // State for phone number input
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)

    // Hook for making payment request
    const { mutate, isPending } = useApiPost<SubscriptionPayment, SubscriptionPayment>(makePaymentApiEndpoint, "payment")

    // Handle phone number input changes
    const handleGetPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(value)
    }

    // Error handling for plan fetch
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching doctor plan", error.response?.data)
    }

    // Handle payment form submission
    const handleSubmitPaymentForm = () => {
        const paymentData: SubscriptionPayment = {
            payment_method: selectedMethod,
            phone_number: Number(phoneNumber)
        }

        // Validate payment data
        if (!paymentData.payment_method) {
            return toast.error("Please select a payment method")
        } else if (!paymentData.phone_number || paymentData.phone_number.toString().length !== 9) {
            return toast.error("Account number must be 9 digit numbers")
        }

        // Submit payment and redirect on success
        mutate(paymentData, {
            onSuccess: () => window.location.href = "http://localhost:3000/patient/subscription"
        })
    }

    return {
        planDetails: data?.data.plan,
        isLoading,
        isPending,
        handleGetPhoneNumber,
        handleSubmitPaymentForm,
        phoneNumber
    }
}

export const useGetSubscriptionData = () => {
    const { data, isLoading, error } = useGetData<SubscriptionDataApiResponse>
        (PATIENT_API_ENDPOINTS.SUBSCRIPTION.getAllSubscription, "subscription")

    console.log("Subscription data received from the api", data?.data?.subscription)
    if (error && axios.isAxiosError(error)) {
        console.log("Error", error.response?.data)
    }

    return { subscriptionDetails: data?.data?.subscription, isLoading }
}

export const useManageSubscriptionData = (subscriptionId: string) => {
    // API endpoint construction
    const getCurrentSubscriptionEndpoint =
        `${PATIENT_API_ENDPOINTS.SUBSCRIPTION.getCurrentSubscription}/${subscriptionId}`;
    const updateSubscriptionStatus =
        `${PATIENT_API_ENDPOINTS.SUBSCRIPTION.updateSubscriptionStatus}/${subscriptionId}`;

    // Hooks for data fetching and updating
    const { mutate, isPending } = useUpdateData(updateSubscriptionStatus, 'subscription');
    const {
        data,
        isLoading,
        error
    } = useGetData<SubscriptionDataWithPlan>(getCurrentSubscriptionEndpoint, 'subscription');

    // Error handling for API calls
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching current subscription plan", error.response?.data);
    }

    // Extract required data from API response
    const currentSubscriptionPlan = data?.data?.current_subscription;
    const subscriptionPlans = data?.data?.subscription_plans;
    const subscriptionStatus = data?.data?.current_subscription.subscription_status;

    useEffect(() => {
        if (currentSubscriptionPlan?.expire_date && subscriptionStatus !== "expired") {
            const expireDate = new Date(currentSubscriptionPlan.expire_date);
            const currentDate = new Date();

            if (currentDate >= expireDate) {
                mutate({ status: "expired" });
            }
        }
    }, [currentSubscriptionPlan?.expire_date, mutate, subscriptionStatus]);

    const handleCancelSubscription = () => {
        if (currentSubscriptionPlan?.subscription_status && subscriptionStatus !== "cancelled") {
            mutate({ status: "cancelled" }, {
                onSuccess: () => toast.success("Plan successfully cancelled")
            });

        }
    }
    return {
        isLoading,
        isPending,
        handleCancelSubscription,
        subscriptionPlans,
        currentSubscriptionPlan
    };
};

export const usePayWithAccountBalance = (planId: string) => {
    const makePaymentApiEndpoint = `${PATIENT_API_ENDPOINTS.PAYMENT.payWithBalance}/${planId}`
    const { mutate, isPending } = useApiPost(makePaymentApiEndpoint, "user")

    const handlePayment = () => {
        mutate({ payment_method: "Balance" }, {
            onSuccess: () => {
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/patient/subscription"
                }, 1000);
            }
        })
    }
    return { isLoading: isPending, handlePayment }

}