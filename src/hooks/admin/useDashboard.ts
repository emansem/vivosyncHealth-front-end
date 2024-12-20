import { ADMIN_API_END_POINT } from "@/app/lib/constant"
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { StatType } from "@/app/admin/dashboard/_dashboardContent/StateSection";
import { Transactions } from "@/app/lib/types";

interface AdminDashboardDetailsApiResponse {
    admin_balance: number
    data: {
        doctors: {
            doctorsDff: number,
            doctorsPercentage: number,
            totaDoctors: number
        },
        patients: {
            totalPatientsDff: number,
            patientPercentage: number,
            totalPatients: number
        },
        subscriptions: {
            activeSubPercentage: number,
            totalActiveSub: number,
            totalActiveSubDff: number,
            totalCancelledSub: number,
            totalExpiredSUb: number
        },
        recentData: {
            recentDoctorsAndPatients: UserType[],
            recentTransactions: Transactions[]
        }
    }
}

export const useGetAllAdminDashboardDetails = () => {
    // Fetch dashboard data with automatic caching using 'dashboard' as cache key
    const { isLoading, error, data } = useGetData<AdminDashboardDetailsApiResponse>(ADMIN_API_END_POINT.getAllAdminDashboardDetails, 'dashboard');

    // Handle API errors and log the full error response
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching admin dashboard details", error.response);
    }

    // Extract doctors metrics and calculate trend direction
    const doctors = data?.data.doctors
    const totalDoctors = doctors?.totaDoctors || 0
    const doctorsTrendValue = doctors?.doctorsDff || 0
    const isTrendPositive = doctorsTrendValue >= 0

    // Extract patients metrics and calculate trend direction
    const patients = data?.data.patients
    const totalPatients = patients?.totalPatients || 0
    const patientTrendValue = patients?.totalPatientsDff || 0
    const isPatientTrendPositive = patientTrendValue >= 0

    // Extract subscription metrics and calculate active subscription trend
    const subscriptions = data?.data.subscriptions
    const activeSubscriptions = subscriptions?.totalActiveSub || 0
    const expiredSubscriptions = subscriptions?.totalExpiredSUb || 0
    const cancelledSubscriptions = subscriptions?.totalCancelledSub || 0
    const activeSubTrendValue = subscriptions?.totalActiveSubDff || 0
    const isActiveSubPositive = activeSubTrendValue >= 0

    // Get recent activity data with empty array fallbacks
    const recentData = data?.data.recentData
    const recentTransactions = recentData?.recentTransactions || [];
    const recentDoctorsAndPatients = recentData?.recentDoctorsAndPatients || []
    const admin_balance = data?.admin_balance || 0
    // Construct dashboard statistics array with trend indicators
    const stats = [
        {
            type: "totalDoctors" as StatType,
            title: "Total Doctors",
            value: totalDoctors,
            trend: { value: doctorsTrendValue, isPositive: isTrendPositive }
        },
        {
            type: "totalPatients" as StatType,
            title: "Total Patients",
            value: totalPatients,
            trend: { value: patientTrendValue, isPositive: isPatientTrendPositive }
        },
        {
            type: "activeSubscriptions" as StatType,
            title: "Active Subscriptions",
            value: activeSubscriptions,
            trend: { value: activeSubTrendValue, isPositive: isActiveSubPositive }
        },
        {
            type: "cancelledSubscriptions" as StatType,
            title: "Cancelled Subscriptions",
            value: cancelledSubscriptions,
        },
        {
            type: "expiredSubscriptions" as StatType,
            title: "Expired Subscriptions",
            value: expiredSubscriptions,
        }, {
            type: "adminBalance" as StatType,
            title: "Total Balance",
            value: admin_balance,
        }
    ];

    // Log successful data fetch for debugging
    console.log("Successfully fetched admin dashboard details", data);

    // Return processed dashboard data and loading state
    return { isLoading, stats, recentDoctorsAndPatients, recentTransactions }
}