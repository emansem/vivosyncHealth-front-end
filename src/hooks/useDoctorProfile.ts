import { ChangeEvent, useEffect, useState } from 'react';
import { useGetUser } from './serviceHook';
import axios from 'axios';
import toast from 'react-hot-toast';

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

    const updateProfileField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({
            ...prev,
            [name as keyof DoctorProfileTypes]: value.trim()
        }));
    };

    useEffect(() => {
        const user = data?.data.user
        if (user)
            setProfileData(user)
    }, [data])
    if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
        console.log(error.response?.data)
    }

    return {
        profileData,
        data,
        updateProfileField,
        setProfileData
    };
};