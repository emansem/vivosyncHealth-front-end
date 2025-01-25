import { ChangeEvent, useEffect, useState } from 'react';
import { useGetData, useUpdateData } from './serviceHook';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUPloadImage } from '@/app/lib/hooks';
import { DOCTOR_API_END_POINTS, GET_DOCTOR_DETAILS } from '@/app/lib/constant';

// Doctor profile data structure
export interface DoctorProfileTypes {
    // Personal & Professional Info
    name: string;
    email: string;
    phone_number: string;
    about: string;
    medical_license: string;
    profile_photo: string;
    years_of_experience: string;
    languages: string;
    speciality: string;

    // Location/Practice Info
    hospital_name: string;
    hospital_address: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    working_days: string;
}


// API response type
interface DoctorApiResponse {
    data: {
        doctor: DoctorProfileTypes
    }
}

// Hook for managing doctor profile updates
export const useUpdateDoctorProfile = () => {
    // Fetch current doctor data
    const { data, error, isLoading } = useGetData<DoctorApiResponse>(
        DOCTOR_API_END_POINTS.PROFILE.getDetails,
        GET_DOCTOR_DETAILS
    );

    // State management
    const [profileData, setProfileData] = useState<Partial<DoctorProfileTypes>>({});
    const { handlePhotoChange, image, previewImage } = useUPloadImage();

    // Update profile mutation
    const { mutate, isPending } = useUpdateData<DoctorProfileTypes, DoctorProfileTypes>(
        DOCTOR_API_END_POINTS.PROFILE.updateProfile,
        GET_DOCTOR_DETAILS
    );

    // Handle input field changes
    const updateProfileField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name as keyof DoctorProfileTypes]: value
        }));
    };

    // Set initial profile data when fetched
    useEffect(() => {
        if (data?.data?.doctor) {
            setProfileData(data.data.doctor);
        }
    }, [data]);

    // Handle API errors
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
    }

    // Submit updated profile data
    const submitDoctorUpdateForm = () => {
        const doctorUpdatedData = { ...profileData, profile_photo: image };
        if (doctorUpdatedData) {
            mutate(doctorUpdatedData as DoctorProfileTypes, {
                onSuccess: () => {
                    toast.success("Profile updated successfully");
                }
            });
        }
    };

    return {
        profileData,
        data,
        isLoading,
        handlePhotoChange,
        previewImage,
        isPending,
        submitDoctorUpdateForm,
        updateProfileField,
        setProfileData
    };
};