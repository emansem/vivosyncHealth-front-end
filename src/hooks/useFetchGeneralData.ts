import { GENERAL_API_END_POINTS } from "@/app/lib/constant"
import { useGetData } from "./serviceHook"
import axios from "axios";

export interface Specialty {
    id: string;
    icon: string;
    title: string;
    bg_color: string,
    description: string,
    status: string

    icon_color: string;
}

export interface Countries {
    id: number
    name: string,
    flag: string,
    cities: string,
    states: string,
    country_code: string
}
interface Availability {
    id: number;
    day: string,
    working_time: string,
    day_code: string
}

interface MetadataApiResponse {
    data: {
        specialties: Specialty[],
        countries: Countries[],
        availability: Availability[]

    }
}

export const useFetchApplicationMetadata = () => {
    const { data, error, isLoading: isLoadingSpecialty } = useGetData<MetadataApiResponse>(GENERAL_API_END_POINTS.GET_APPLICATION_META_DATA, 'generalData');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching meta data", error)
    }
    const specialties = data?.data.specialties
    const countries = data?.data.countries
    const availability = data?.data.availability
    return { specialties, isLoadingSpecialty, countries, availability }
}