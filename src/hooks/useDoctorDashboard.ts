import { DOCTOR_API_END_POINTS } from "@/app/lib/constant"
import { useGetData } from "./serviceHook"
import axios from "axios"
interface DoctorDashboardApiResponse {
    data: {
        details: {
            activeSubscription: number,
            doctorName: string,
            inactiveSubscription: number,
            totalBalance: number,
            totalPatient: number
        }
    }
}

export const useDoctorDashboard = () => {
    const { data, error, isLoading } = useGetData<DoctorDashboardApiResponse>(DOCTOR_API_END_POINTS.dashboard.getAllData, 'details')
    if (error && axios.isAxiosError(error)) {
        console.log(error.response?.data)
        return
    }

    console.log("Doctor dashboard details", data)

    return { doctorData: data?.data.details, isLoading }
}