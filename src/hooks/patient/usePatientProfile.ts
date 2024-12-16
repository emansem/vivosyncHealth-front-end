import { Transactions } from "@/app/lib/types"
import { useGetData, UserType, useUpdateData } from "../serviceHook"
import { PATIENT_API_ENDPOINTS } from "@/app/lib/constant"
import { AlertCircle, Calendar, ClipboardList } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useUPloadImage } from "@/app/lib/hooks"
import toast from "react-hot-toast"

export interface UpdatePatientPersonalInfo {
    name: string,
    phone_number: string,
    country: string,
    state: string,
    city: string,
    profile_photo: string,
    date_of_birth: string,
    gender: "male" | "female" | 'custom' | '' | undefined
}

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

// Custom hook for managing and updating patient's personal information
export const useUpdatePatientPersonalInfo = () => {
    const { patientData, isLoading } = useGetPatientProfileDetails();
    const { handlePhotoChange, previewImage, image } = useUPloadImage()
    const { isPending, mutate } = useUpdateData(PATIENT_API_ENDPOINTS.PROFILE.updatePersonalDetails, 'profile');
    // Initialize state with patientData when it changes
    const [patientPersonalInfo, setPatientPersonalInfo] = useState<UpdatePatientPersonalInfo>({

        name: patientData?.name as string,
        phone_number: patientData?.phone_number as string,
        country: '',
        state: '',
        city: '',
        gender: '',
        date_of_birth: '',
        profile_photo: image || ''

    });

    useEffect(() => {
        if (patientData) {
            setPatientPersonalInfo({
                name: patientData.name || '',
                phone_number: patientData.phone_number || '',
                country: patientData.country || '',
                state: patientData.state || '',
                city: patientData.city || '',
                gender: patientData.gender || '',
                date_of_birth: patientData.date_of_birth || '',
                profile_photo: patientData.profile_photo || ''
            });
        }
    }, [patientData]);

    useEffect(() => {
        setPatientPersonalInfo(prev => ({ ...prev, profile_photo: image }))
    }, [image])
    const handleUpdatePatientPersonalInfo = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatientPersonalInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Check if any required field is empty
        const hasEmptyFields = Object.entries(patientPersonalInfo).some(([item, value]) => {
            if (!value) {
                toast.error(`${item} is required`);
                return true; // Return true to indicate validation failed
            }
            return false;
        });

        // Only proceed with mutation if all fields are filled
        if (!hasEmptyFields) {
            mutate(patientPersonalInfo, {
                onSuccess: (result) => toast.success(result.data.message)
            });
        }
    }

    return { patientPersonalInfo, handleSubmit, isPending, isLoading, handleUpdatePatientPersonalInfo, handlePhotoChange, previewImage };
};