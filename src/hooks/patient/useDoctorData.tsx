import { PATIENT_API_ENDPOINTS, PATIENT_QUERY_KEYS } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { SubscriptionPlanDataType } from "@/app/lib/types";

// API Response types
interface DoctorsApiResponse {
  data: {
    doctors: UserType[];
  };
}

interface DoctorApiResponse {
  data: {
    doctor: UserType;
  };
}

interface DoctorPlansApiResponse {
  data: {
    plans: SubscriptionPlanDataType[];
  };
}

// Hook to fetch all doctors
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

// Hook to fetch specific doctor's data and their plans
export const useGetDoctorData = (doctorId: string) => {
  const getDctorAccountDetails = `${PATIENT_API_ENDPOINTS.DOCTOR.getDoctor}/${doctorId}`;
  const getDoctorPlanDetails = `${PATIENT_API_ENDPOINTS.DOCTOR.getDoctorPlan}/${doctorId}`;

  const { data, error, isLoading } = useGetData<DoctorApiResponse>(
    getDctorAccountDetails,
    "doctor"
  );

  const { data: planDetails } = useGetData<DoctorPlansApiResponse>(
    getDoctorPlanDetails,
    "plan"
  );

  if (error && axios.isAxiosError(error)) {
    console.log("Error fetching doctor profile details", error.response?.data);
  }

  return {
    doctor: data?.data?.doctor,
    planDetails: planDetails?.data?.plans,
    isLoading
  };
};
