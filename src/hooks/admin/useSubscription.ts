import { ADMIN_API_END_POINT } from "@/app/lib/constant"
import { useGetData } from "../serviceHook"
import axios from "axios";
import { SubscriptionData } from "@/app/lib/types";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
interface AdminSubscriptionApiResponse {
    data: {
        activeSubscriptions: number,
        totalActiveSubDff: number
        totalCancelledSub: number
        totalExpiredSub: number
        totalResult: number,
        totalSubscriptionRevenue: number
        subscriptionData: SubscriptionData[]
        mobileSubscription: SubscriptionData[]
    }
}

export const useAdminSubscription = (page: number, setPageNumber: Dispatch<SetStateAction<number>>) => {
    const { filterSubscriptionValues, handleOnChange } = useFilterSubscriptions()
    const { plan_type, status } = filterSubscriptionValues
    const adminsubscriptionApiEndPoint = `${ADMIN_API_END_POINT.getAllAdminSubscriptionDetails}/?page=${page}&limit=${10}&plan_type=${plan_type}&status=${status}`
    const { data, isLoading, error } = useGetData<AdminSubscriptionApiResponse>(adminsubscriptionApiEndPoint, 'subscription');
    // Handle API errors and log the full error response
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching admin subscription details", error.response);
    }
    useEffect(() => {
        setPageNumber(1)
    }, [filterSubscriptionValues, setPageNumber])
    const subscriptionDetails = data?.data
    const activeSubscriptions = subscriptionDetails?.activeSubscriptions || 0
    const cancelledSubscriptions = subscriptionDetails?.totalCancelledSub || 0
    const totalSubscriptionRevenue = subscriptionDetails?.totalSubscriptionRevenue
    const expiredSubscriptions = subscriptionDetails?.totalExpiredSub || 0
    const subscriptionData = subscriptionDetails?.subscriptionData as SubscriptionData[] || []
    const totalSubscription = subscriptionDetails?.totalResult
    const mobileSubscription = subscriptionDetails?.mobileSubscription as SubscriptionData[] || []


    const stats = [
        {
            title: "Total Revenue",
            value: totalSubscriptionRevenue,

            type: "revenue"
        },
        {
            title: "Active Subscriptions",
            value: activeSubscriptions,

            type: "activeSubscriptions"
        },
        {
            title: "Expired Subscriptions",
            value: expiredSubscriptions,

            type: "expiringSoon"
        },
        {
            title: "Cancelled",
            value: cancelledSubscriptions,

            type: "cancelled"
        }
    ];
    return { isLoading, stats, handleOnChange, filterSubscriptionValues, mobileSubscription, subscriptionData, totalSubscription }

}

export interface FilterSubscription {
    plan_type: string,
    status: string
}
const defaultSubscriptionFilter: FilterSubscription = {
    plan_type: "",
    status: ''
}

const useFilterSubscriptions = () => {
    const [filterSubscriptionValues, setFilterSubscriptionValues] = useState<FilterSubscription>(defaultSubscriptionFilter)
    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target
        setFilterSubscriptionValues(prev => ({
            ...prev,
            [name]: value
        }))
    }
    return { handleOnChange, filterSubscriptionValues }
}
