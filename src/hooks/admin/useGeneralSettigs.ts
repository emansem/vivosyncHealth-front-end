import { ChangeEvent, useEffect, useState } from "react";
import { useGetData, useUpdateData } from "../serviceHook";
import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import axios from "axios";
import toast from "react-hot-toast";

// Type definitions for frontend state management
interface GeneralSettings {
    websiteName: string;
    tagline: string;
    metaDescription: string;
    metaKeywords: string;
    patientFee: string;
    doctorCommission: string;
    subscriptionDuration: 'monthly' | 'yearly' | 'weekly';
    status: 'active' | 'suspended' | 'maintenance';
    supportEmail: string;
    supportPhone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Type definition matching backend API response structure
interface GeneralSettingsApi {
    website_name: string;
    website_status: 'active' | 'suspended' | 'maintenance';
    suport_email: string;
    support_phone: string;
    subscription_duration: 'monthly' | 'yearly' | 'weekly';
    meta_description: string;
    meta_keywords: string;
    website_tagline: string;
    patient_fee: string;
    doctor_commission: string;
}

// Default values for the settings form
const defaultGeneralSettings: GeneralSettings = {
    websiteName: "",
    tagline: "",
    metaDescription: "",
    metaKeywords: "",
    patientFee: "",
    doctorCommission: "",
    subscriptionDuration: "monthly",
    status: "active",
    supportEmail: "",
    supportPhone: ""
};

// Custom hook for managing general settings state and operations
export const useGeneralSettings = () => {
    const [settingsData, setSettingsData] = useState<GeneralSettings>(defaultGeneralSettings);
    const { isLoading, generalSettingsDetails } = useGetAllAdminGeneralSettings();
    const [message, setMessage] = useState({ type: "", text: "" });
    const { mutate, isPending } = useUpdateData(ADMIN_API_END_POINT.updateAdminGeneralSettings, 'settings');

    // Handle form input changes
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettingsData((prev) => ({
            ...prev,
            [name]: value
        }));
        setMessage({ type: "", text: "" });
    };

    // Sync state with API data when available
    useEffect(() => {
        if (generalSettingsDetails) {
            const {
                website_name,
                website_status,
                website_tagline,
                meta_keywords,
                doctor_commission,
                patient_fee,
                meta_description,
                subscription_duration,
                suport_email,
                support_phone
            } = generalSettingsDetails;

            // Map API response fields to frontend state fields
            setSettingsData(prev => ({
                ...prev,
                websiteName: website_name || '',
                status: website_status || 'active',
                tagline: website_tagline || '',
                metaKeywords: meta_keywords || '',
                doctorCommission: doctor_commission || "",
                patientFee: patient_fee || "",
                metaDescription: meta_description || '',
                subscriptionDuration: subscription_duration || 'monthly',
                supportEmail: suport_email || '',
                supportPhone: support_phone || ''
            }));
        }
    }, [generalSettingsDetails]);

    // Handle settings update submission
    const handleUpdateSettings = async () => {
        if (settingsData) {
            mutate(settingsData, {
                onSuccess: (result) => toast.success(result.data.message)
            });
        }
    };

    return { handleInputChange, handleUpdateSettings, settingsData, message, isLoading, isPending };
};

interface GeneralSettingsApiResponse {
    data: {
        settings: GeneralSettingsApi
    }
}

// Custom hook to fetch general settings from API
const useGetAllAdminGeneralSettings = () => {
    const { isLoading, data, error } = useGetData<GeneralSettingsApiResponse>(
        ADMIN_API_END_POINT.getAllAdminGeneralSettings,
        'settings'
    );

    if (error && axios.isAxiosError(error)) {
        console.log("error fetching admin settings", error.response?.data);
    }

    const generalSettingsDetails = data?.data.settings as GeneralSettingsApi;
    return { generalSettingsDetails, isLoading };
};