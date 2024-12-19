import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface PatientsApiResponse {
    totalPatients: number;
    totalResult: number;
    data: {
        patients: UserType[];
    };
}
export interface FilterPatients {
    searchValue: string;
    country: string;
    status?: string;
}

export const useGetPatientList = (
    page: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
    const { handleClearFilter, handleOnChange, filterValues } =
        useFilterPatients();
    const { searchValue, status, country } = filterValues;
    const patientsListApiEndpoint = `${ADMIN_API_END_POINT.getAllPatientsData
        }/?page=${page}&limit=${10}&country=${country}&status=${status}&searchValue=${searchValue}`;
    const { data, isLoading, error } = useGetData<PatientsApiResponse>(
        patientsListApiEndpoint,
        "patientsList"
    );
    console.log(patientsListApiEndpoint)

    useEffect(() => {
        setPageNumber(1);
    }, [filterValues]);

    // Safely access nested properties
    const patients = data?.data?.patients || [];
    const totalPatients = data?.totalPatients ?? 0;
    const totalResult = data?.totalResult ?? 0;

    if (error && axios.isAxiosError(error)) {
        console.log("error", error.response?.data);
    }
    console.log(error);
    console.log("fetching......patients", data)

    return {
        patients,
        isLoading,
        totalPatients,
        totalResult,
        handleClearFilter,
        handleOnChange,
        filterValues
    };
};


const useFilterPatients = () => {
    const [filterValues, setFilterValues] = useState<FilterPatients>({
        searchValue: "",
        country: "",
        status: ""
    });

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilterValues((prev) => ({ ...prev, [name]: value }));
    };
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