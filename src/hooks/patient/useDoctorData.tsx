import { PATIENT_API_ENDPOINTS, PATIENT_QUERY_KEYS } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { ChangeEvent, useEffect, useState } from "react";

// API Response type definitions
interface DoctorsApiResponse {
  totalDoctors: number;
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

/**
 * Hook for fetching and managing doctors list with pagination and filters
 */
export const useGetAllDoctors = () => {
  const {
    handleOnselectValue,
    findDoctorFilterValues,
    setFindDoctorFilterValues
  } = useGetFilterValues();
  const [pageNumber, setPageNumber] = useState(1);

  // Construct API endpoint with filters and pagination
  const GET_ALL_DOCTORS_END_POINT = `${
    PATIENT_API_ENDPOINTS.DOCTOR.getAllDoctors
  }/?page=${pageNumber}&limit=${10}&specialty=${
    findDoctorFilterValues.specialityValue
  }&rating=${findDoctorFilterValues.ratingValue}&country=${
    findDoctorFilterValues.locationValue
  }&searchValue=${findDoctorFilterValues.searchValue}`;

  // Fetch doctors data
  const { data, error, isLoading } = useGetData<DoctorsApiResponse>(
    GET_ALL_DOCTORS_END_POINT,
    PATIENT_QUERY_KEYS.GET_ALL_DOCTORS
  );

  const [isPending, setIsPending] = useState(false);

  // State for accumulated doctors list
  const [doctors, setDoctors] = useState<UserType[]>([]);

  const [preservedTotalResult, setPreservedTotalResult] = useState(0);

  // Update doctors list when new data arrives
  useEffect(() => {
    setIsPending(true);
    if (data?.data.doctors) {
      if (pageNumber === 1) {
        setDoctors(data.data.doctors);
      } else {
        setDoctors((prevDoctors) => [...prevDoctors, ...data.data.doctors]);
      }
      setIsPending(false);
    }
  }, [data, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [findDoctorFilterValues]);

  console.log("Filter doctor data", doctors);

  // Handle "Load More" pagination
  const handlePageNumber = () => {
    if (!data?.totalDoctors) return;

    const totalPages = Math.ceil(data.totalDoctors / 10);
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
      setIsPending(true);
    }
  };

  // Specialty filter management
  const [, setSpecialty] = useState("all");
  const handleGetSpecialty = (specialty: string) => {
    setSpecialty(specialty);
    setFindDoctorFilterValues((prev) => ({
      ...prev,
      specialityValue: specialty
    }));
  };
  const totalDoctors = data?.totalDoctors;

  useEffect(() => {
    setPreservedTotalResult(totalDoctors as number);
  }, [totalDoctors, preservedTotalResult]);

  // Error handling
  if (error && axios.isAxiosError(error)) {
    console.log("Error fetching doctors", error.response?.data);
  }

  return {
    totalResult: preservedTotalResult,
    findDoctorFilterValues,
    handleOnselectValue,
    handlePageNumber,
    handleGetSpecialty,
    doctors,
    isPending,
    isLoading,
    error
  };
};

/**
 * Hook for fetching specific doctor's details and their subscription plans
 */
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

// Filter types and initial values
interface FindDoctorFilterValue {
  searchValue: string;
  specialityValue: string;
  locationValue: string;
  ratingValue: number;
}

const INITIAL_FILTER_VALUES: FindDoctorFilterValue = {
  searchValue: "",
  specialityValue: "all",
  ratingValue: 0,
  locationValue: "all"
};

/**
 * Hook for managing doctor filter values
 */
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

  return {
    handleOnselectValue,
    setFindDoctorFilterValues,
    findDoctorFilterValues
  };
};
