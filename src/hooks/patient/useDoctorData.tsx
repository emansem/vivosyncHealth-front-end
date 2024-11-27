import { PATIENT_API_ENDPOINTS, PATIENT_QUERY_KEYS } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";

interface DoctorsApiResponse {
  data: {
    doctors: UserType[];
  };
}

export const useGetAllDoctors = () => {
  const { data, error, isLoading } = useGetData<DoctorsApiResponse>(
    PATIENT_API_ENDPOINTS.DOCTOR.getAllDoctors,
    PATIENT_QUERY_KEYS.GET_ALL_DOCTORS
  );

  if (error && axios.isAxiosError(error)) {
    console.log("Error fetching doctors", error.response?.data);
  }

  return {
    doctors: data?.data.doctors || [],
    isLoading,
    error
  };
};
