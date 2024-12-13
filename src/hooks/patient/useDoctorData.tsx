import { PATIENT_API_ENDPOINTS, PATIENT_QUERY_KEYS } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { ChangeEvent, useState } from "react";

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
  const {
    handleOnselectValue,
    findDoctorFilterValues,
    setFindDoctorFilterValues
  } = useGetFilterValues();

  const { data, error, isLoading } = useGetData<DoctorsApiResponse>(
    PATIENT_API_ENDPOINTS.DOCTOR.getAllDoctors,
    PATIENT_QUERY_KEYS.GET_ALL_DOCTORS
  );

  const [specialty, setSpecialty] = useState("all");

  const handleGetSpecialty = (specialty: string) => {
    setSpecialty(specialty);
    setFindDoctorFilterValues((prev) => ({
      ...prev,
      specialityValue: specialty
    }));
  };

  if (error && axios.isAxiosError(error)) {
    console.log("Error fetching doctors", error.response?.data);
  }

  return {
    findDoctorFilterValues,
    handleOnselectValue,
    handleGetSpecialty,
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

interface FindDoctorFilterValue {
  searchValue: string;
  specialityValue: string;
  locationValue: string;
  ratingValue: number;
}

const INITIAL_FILTER_VALUES: FindDoctorFilterValue = {
  searchValue: "all",
  specialityValue: "all",
  ratingValue: 0,
  locationValue: "all"
};

const useGetFilterValues = () => {
  const [findDoctorFilterValues, setFindDoctorFilterValues] =
    useState<FindDoctorFilterValue>(INITIAL_FILTER_VALUES);

  const handleOnselectValue = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFindDoctorFilterValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  console.log("Filter values", findDoctorFilterValues);

  return {
    handleOnselectValue,
    setFindDoctorFilterValues,
    findDoctorFilterValues
  };
};
