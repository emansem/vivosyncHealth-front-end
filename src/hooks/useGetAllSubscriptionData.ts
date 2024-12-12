import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import { useGetData } from "./serviceHook";
import axios from "axios";
import { Patient } from "../types/general";
import { ChangeEvent, useState } from "react";
interface GetAllDoctorSubscription {
    data: {
        subscription: Patient[]
    },
    totalItems: number
}

export const useGetAllSubscriptionData = (pageNumber: number, filterTag: string = 'All', userType: string) => {
    const [filterPlanType, setFilterPlanType] = useState('all');
    const getAllSubscriptionEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_SUBSCRIPTION_DATA}/?page=${pageNumber}&limit=10&status=${filterTag || "All"}&planType=${filterPlanType}&userType=${userType}`
    const { data, error, isLoading } = useGetData<GetAllDoctorSubscription>(getAllSubscriptionEndPoint, "subscription")
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching subscription details", error.response?.data)
    }

    console.log(filterPlanType)

    const handleFilterPlanType = (e: ChangeEvent<HTMLSelectElement>) => setFilterPlanType(e.target.value)

    return { subscriptionData: data?.data.subscription, handleFilterPlanType, filterPlanType, totalItems: data?.totalItems, isLoading }

}