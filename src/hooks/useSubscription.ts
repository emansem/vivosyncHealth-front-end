import { PATIENT_API_ENDPOINTS } from "@/app/lib/constant"
import { useApiPost, useGetData } from "./serviceHook"
import { GetPlanApiResponse } from "./pricingPlan/useUtileHook";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
interface SubscriptionPayment {
    phone_number: number,
    payment_method: string
}


export const useSubscription = (planId: string, selectedMethod: string) => {
    const apiEndPoint = `${PATIENT_API_ENDPOINTS.PLAN.getDoctorPlan}/${planId}`
    const makePaymentApiEndpoint = `${PATIENT_API_ENDPOINTS.PAYMENT.collect}/${planId}`
    const { data, isLoading, error } = useGetData<GetPlanApiResponse>(apiEndPoint, "plan");
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(undefined)
    const { mutate, isPending } = useApiPost<SubscriptionPayment, SubscriptionPayment>(makePaymentApiEndpoint, "payment")

    const handleGetPhoneNumber = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^0-9]/g, "");
        setPhoneNumber(value)
        console.log(value)
    }

    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching doctor plan", error.response?.data)
    }
    const handleSubmitPaymentForm = () => {
        const paymentData: SubscriptionPayment = {
            payment_method: selectedMethod,
            phone_number: Number(phoneNumber)
        }
        if (!paymentData.payment_method) {
            return toast.error("Please select a payment method")

        } else if (!paymentData.phone_number || paymentData.phone_number.toString().length !== 9) {
            return toast.error("Account number must be  9 digit numbers")
        }
        mutate(paymentData, {
            onSuccess: () => window.location.href = "http://localhost:3000/patient/subscription"
        })
    }

    return { planDetails: data?.data.plan, isLoading, isPending, handleGetPhoneNumber, handleSubmitPaymentForm, phoneNumber }
}