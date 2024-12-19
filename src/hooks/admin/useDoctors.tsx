import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { useGetData, UserType } from "../serviceHook";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

interface DoctorListApiRespone {
  totalDoctors: number;
  totalResult: number;
  data: {
    doctors: UserType[];
  };
}

export interface FilterDoctors {
  searchValue: string;
  country: string;
  specialty: string;
}

export const useGetDoctorList = (
  page: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  const { handleClearFilter, handleOnChange, filterValues } =
    useFilterDoctors();
  const { searchValue, specialty, country } = filterValues;
  const doctorListApiEndpoint = `${
    ADMIN_API_END_POINT.getAllDoctorsDetails
  }/?page=${page}&limit=${10}&country=${country}&specialty=${specialty}&searchValue=${searchValue}`;
  const { data, isLoading, error } = useGetData<DoctorListApiRespone>(
    doctorListApiEndpoint,
    "doctors"
  );

  useEffect(() => {
    setPageNumber(1);
  }, [filterValues]);

  const doctors = data?.data.doctors as UserType[];
  const totalDoctors = data?.totalDoctors;
  const totalResult = data?.totalResult;

  if (error && axios.isAxiosError(error)) {
    console.log("error", error.response?.data);
  }
  console.log(filterValues);

  return {
    doctors,
    isLoading,
    totalDoctors,
    totalResult,
    handleClearFilter,
    handleOnChange,
    filterValues
  };
};

const useFilterDoctors = () => {
  const [filterValues, setFilterValues] = useState<FilterDoctors>({
    searchValue: "",
    country: "",
    specialty: ""
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
      specialty: ""
    }));
  };
  return { filterValues, handleClearFilter, handleOnChange };
};
