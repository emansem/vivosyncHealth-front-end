import { Transactions } from "@/app/lib/types"
import { useGetData, UserType } from "../serviceHook"
import { PATIENT_API_ENDPOINTS } from "@/app/lib/constant"
import { AlertCircle, Calendar, ClipboardList } from "lucide-react"

interface PatientDetailsApiResponse {
    data: {
        patient: UserType,
        recentTransactions: Transactions[],
        activeSubscription: number,
        expiredSubscription: number,
        totalSubscription: number
    }
}
export const useGetPatientProfileDetails = () => {
    const { data, isLoading } = useGetData<PatientDetailsApiResponse>(PATIENT_API_ENDPOINTS.PROFILE.getProfileDetails, "profile");
    const patientData = data?.data?.patient
    const recentTransactions = data?.data?.recentTransactions
    const activeSubscription = data?.data.activeSubscription
    const expiredSubscription = data?.data.expiredSubscription
    const totalSubscription = data?.data.totalSubscription

    const stats = [
        {
            title: "Total Subscriptions",
            value: totalSubscription,
            icon: ClipboardList,

        },


        {
            title: "Active Subscriptions",
            value: activeSubscription,
            icon: Calendar,

        },
        {
            title: "Expired Subscriptions",
            value: expiredSubscription,
            icon: AlertCircle,

        }
    ];

    return { patientData, recentTransactions, isLoading, stats }
}

