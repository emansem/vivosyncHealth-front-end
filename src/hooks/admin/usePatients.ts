import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { useGetData, UserType, useUpdateData } from "../serviceHook";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Transactions } from "@/app/lib/types";
import { useUPloadImage } from "@/app/lib/hooks";
import toast from "react-hot-toast";

// Types for API responses and data structures
interface PatientsApiResponse {
    totalPatients: number;
    totalResult: number;
    activePatients: number,
    inactivePatients: number,
    data: {
        patients: UserType[];
        mobilePatientListData: UserType[]
    };
}

interface FilterPatients {
    searchValue: string;
    country: string;
    status?: string;
}

interface PatientDetailsApiResponse {
    data: {
        transactions: Transactions[],
        patientDetails: UserType
    }
}

interface PatientDetails {
    profile_photo: string,
    name: string,
    phone_number: string,
    email: string,
    country: string,
    status: string,
    balance: string
    date_of_birth: string
}

// Hook to fetch and manage patient list with pagination and filtering
export const useGetPatientList = (
    page: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
    const { handleClearFilter, handleOnChange, filterValues } = useFilterPatients();
    const { searchValue, status, country } = filterValues;

    // Construct API endpoint with query parameters
    const patientsListApiEndpoint = `${ADMIN_API_END_POINT.getAllPatientsData}/?page=${page}&limit=${10}&country=${country}&status=${status}&searchValue=${searchValue}`;

    // Fetch patients data using custom hook
    const { data, isLoading, error } = useGetData<PatientsApiResponse>(
        patientsListApiEndpoint,
        "patientsList"
    );

    // Reset page number when filters change
    useEffect(() => {
        setPageNumber(1);
    }, [filterValues, setPageNumber]);

    // Safely extract data with fallback values
    const patients = data?.data?.patients || [];
    const totalPatients = data?.totalPatients ?? 0;
    const totalResult = data?.totalResult ?? 0;
    const mobilePatientListData = data?.data.mobilePatientListData || [];
    const inActivePatients = data?.inactivePatients || 0;
    const activePatients = data?.activePatients || 0;

    // Handle API errors
    if (error && axios.isAxiosError(error)) {
        // Log error for debugging
    }

    return {
        patients,
        isLoading,
        inActivePatients,
        activePatients,
        totalPatients,
        totalResult,
        mobilePatientListData,
        handleClearFilter,
        handleOnChange,
        filterValues
    };
};

// Hook to manage patient filtering state
const useFilterPatients = () => {
    const [filterValues, setFilterValues] = useState<FilterPatients>({
        searchValue: "",
        country: "",
        status: ""
    });

    // Handle filter input changes
    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };

    // Reset all filters to default values
    const handleClearFilter = () => {
        setFilterValues((prev) => ({
            ...prev,
            searchValue: "",
            country: "",
            status: ""
        }));
    };

    return { filterValues, handleClearFilter, handleOnChange };
};

// Default state for patient information
const defaultPatientInfo: PatientDetails = {
    name: '',
    balance: '',
    email: '',
    phone_number: '',
    country: '',
    date_of_birth: '',
    status: '',
    profile_photo: ''
};

// Hook to manage patient profile updates and fetching
export const useUpdateAndgetPatientProfile = (patientId: string) => {
    const GET_PATIENT_BY_ID_API_END_POINT = `${ADMIN_API_END_POINT.getPatientById}/${patientId}`;

    // Fetch patient details
    const { data, isLoading } = useGetData<PatientDetailsApiResponse>(GET_PATIENT_BY_ID_API_END_POINT, 'patient');

    // Extract data with fallbacks
    const transactions = data?.data.transactions || [];
    const patientDetails = data?.data.patientDetails;

    // Handle profile photo uploads
    const { handlePhotoChange, previewImage, image } = useUPloadImage();

    // Manage patient information state
    const [patientPersonalInfo, setPatientPersonalInfo] = useState<PatientDetails>(defaultPatientInfo);
    const { handleUpdateDetails, isPending } = useUpdatePatientDetails(patientPersonalInfo, patientId);

    // Update local state when patient details are fetched
    useEffect(() => {
        setPatientPersonalInfo((prev => ({
            ...prev,
            name: patientDetails?.name as string || '',
            email: patientDetails?.email || "",
            phone_number: patientDetails?.phone_number || "",
            country: patientDetails?.country || "",
            date_of_birth: patientDetails?.date_of_birth as string || "",
            profile_photo: patientDetails?.profile_photo || "",
            balance: patientDetails?.balance as string || "",
            status: patientDetails?.status as string || ""

        })))
    }, [patientDetails]);

    // Update profile photo when new image is uploaded
    useEffect(() => {
        setPatientPersonalInfo(prev => ({
            ...prev,
            profile_photo: image
        }));
    }, [image]);

    // Handle form input changes
    const handleUpdatePatientPersonalInfo = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setPatientPersonalInfo((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        handleUpdatePatientPersonalInfo,
        handlePhotoChange,
        isPending,
        handleUpdateDetails,
        image,
        previewImage,
        isLoading,
        transactions,
        patientPersonalInfo
    };
};

// Hook to handle patient details update API calls
const useUpdatePatientDetails = (patientPersonalInfo: PatientDetails, patientId: string) => {
    const updatePatientApiEndPoint = `${ADMIN_API_END_POINT.updatePatientDetails}/${patientId}`;

    // Use mutation hook for updates
    const { isPending, mutate } = useUpdateData<PatientDetails, PatientDetails>(updatePatientApiEndPoint, 'patient');

    // Handle update submission
    const handleUpdateDetails = () => {
        if (patientPersonalInfo) {
            mutate(patientPersonalInfo, {
                onSuccess: (result) => toast.success(result.data.message)
            });
        }
    };

    return { handleUpdateDetails, isPending };
};