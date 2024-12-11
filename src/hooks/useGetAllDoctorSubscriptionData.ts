import { DOCTOR_API_END_POINTS } from "@/app/lib/constant";
import { useGetData } from "./serviceHook";
import axios from "axios";
import { Patient } from "../types/general";
interface GetAllDoctorSubscription {
    data: {
        subscription: Patient[]
    }
}

export const useGetAllDoctorSubscriptionData = (pageNumber: number) => {
    const getAllSubscriptionEndPoint = `${DOCTOR_API_END_POINTS.SUBSCRIPTION.GET_ALL_SUBSCRIPTION_DATA}/?page=${pageNumber}&limit=10`
    const { data, error, isLoading } = useGetData<GetAllDoctorSubscription>(getAllSubscriptionEndPoint, "subscription")
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching subscription details", error.response?.data)
    }

    console.log("Successfully fetched doctor subscription", data)

    return { subscriptionData: data?.data.subscription, isLoading }

}