import { ChangeEvent, useEffect, useState } from 'react';
import { useGetUser, useUpdateData } from './serviceHook';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUPloadImage } from '@/app/lib/hooks';
import { DOCTOR_API_END_POINTS, GET_USER_QUERY_KEY } from '@/app/lib/constant';

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

/**
 * Custom hook for managing doctor profile data */
export const useUpdateDoctorProfile = () => {
    const { data, error } = useGetUser()
    const [profileData, setProfileData] = useState<Partial<DoctorProfileTypes>>({});
    const { handlePhotoChange, image, previewImage } = useUPloadImage();
    const apiEndpoint = DOCTOR_API_END_POINTS.PROFILE.updateProfile

    const { mutate, isPending } = useUpdateData<DoctorProfileTypes, DoctorProfileTypes>(apiEndpoint, GET_USER_QUERY_KEY)

    const updateProfileField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({
            ...prev,
            [name as keyof DoctorProfileTypes]: value
        }));
    };

    useEffect(() => {
        const user = data?.data.user
        if (user)
            setProfileData(user)
    }, [])
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
        console.log(error.response?.data)
    }
    console.log(image, previewImage)


    const submitDoctorUpdateForm = () => {
        const doctorUpdatedData = { ...profileData, profile_photo: image }
        if (doctorUpdatedData) {
            mutate(doctorUpdatedData as DoctorProfileTypes)
        }
    }

    return {
        profileData,
        data,
        handlePhotoChange,
        previewImage,
        isPending,
        submitDoctorUpdateForm,
        updateProfileField,
        setProfileData
    };
};