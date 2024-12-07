import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import axios from "axios";
import { UserType, useGetData } from "../serviceHook";

// Type definitions for API responses
interface SubscriptionDataApiResponse {
    data: {
        users: UserType[];
    };
}


/**
 * Hook to fetch active subscriptions
 * Returns list of active users and loading state
 */
export const useGetActiveSubscription = () => {
    const { data, error, isLoading } = useGetData<SubscriptionDataApiResponse>(
        GENERAL_API_END_POINTS.GET_ACTIVE_SUBSCRIPTION,
        'activeSubscription'
    );

    // Proper error handling with type checking
    if (error && axios.isAxiosError(error)) {
        console.error("Error fetching subscription data:", error.response?.data);
    }

    return { activeUsers: data?.data?.users, isLoading };
};
