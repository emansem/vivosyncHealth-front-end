"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Users, UserCheck, UserX } from "lucide-react";
import { colors } from "@/app/lib/constant";
import FilterSection from "./_patientsContent/FilterSection";
import PatientListDesktop from "./_patientsContent/PatientListDesktop";
import PatientListMobile from "./_patientsContent/PatientListMobile";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { useGetPatientList } from "@/src/hooks/admin/usePatients";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

// Helper function for status colors
export const getStatusColor = (status: string) => {
  const statusColors = {
    active: { text: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
    inactive: { text: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" },
    pending: {
      text: "text-yellow-700",
      bg: "bg-yellow-50",
      dot: "bg-yellow-500"
    }
  };
  return statusColors[status] || statusColors.pending;
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatsCard = ({ title, value, icon, color, bgColor }: StatsCardProps) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
        {React.cloneElement(icon as React.ReactElement, {
          size: 24,
          color: color
        })}
      </div>
    </div>
  </Card>
);

// Sample data - replace with your actual data
export const patients = [
  {
    id: "P001",
    name: "John Smith",
    photo: "/api/placeholder/40/40",
    country: "United States",
    joinDate: "2024-01-15",
    status: "active"
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    photo: "/api/placeholder/40/40",
    country: "Canada",
    joinDate: "2024-02-01",
    status: "inactive"
  }
  // Add more sample data as needed
];

// Patient List Component
const PatientList = () => {
  // Track total number of transactions to calculate pagination
  const [totalResult, setTotalResult] = useState(0);

  // Get pagination controls and state from custom hook
  // This handles page numbers, navigation, and item indexing
  const {
    pageNumber,
    pages,
    handlePrevButton,
    startIndex,
    endIndex,
    getPageNumber,
    handleNextButton,
    setPageNumber
  } = usePaginationHook(totalResult);

  const {
    patients,
    totalPatients,
    mobilePatientListData,
    handleClearFilter,
    handleOnChange,
    filterValues,
    isLoading,
    activePatients,
    inActivePatients,
    totalResult: result
  } = useGetPatientList(pageNumber, setPageNumber);

  // Update total results when the data changes
  // This keeps pagination in sync with filtered results
  useEffect(() => {
    setTotalResult(result as number);
  }, [result]);

  const shouldShowNoResult =
    !isLoading && (!mobilePatientListData.length || !patients.length);
  const shouldShowData =
    !isLoading && (mobilePatientListData.length || patients.length);

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: <Users />,
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Active Patients",
      value: activePatients,
      icon: <UserCheck />,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Inactive Patients",
      value: inActivePatients,
      icon: <UserX />,
      color: "#F44336",
      bgColor: "#FFEBEE"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Patient Management
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search - Desktop */}
      <FilterSection
        handleClearFilter={handleClearFilter}
        filterValues={filterValues}
        handleOnChange={handleOnChange}
      />
      {isLoading && <InnerPageLoader />}
      {shouldShowNoResult && (
        <NoResults
          heading="No Patient Found"
          message="We couldn't found any patient"
        />
      )}

      {shouldShowData && (
        <>
          {/* Patient List - Desktop */}
          <PatientListDesktop
            startIndex={startIndex}
            endIndex={endIndex}
            pages={pages}
            patients={patients}
            getPageNumber={getPageNumber}
            pageNumber={pageNumber}
            handleNextButton={handleNextButton}
            handlePrevButton={handlePrevButton}
            totalResult={totalResult}
          />

          {/* Patient List - Mobile */}
          <PatientListMobile patients={mobilePatientListData} />
        </>
      )}
    </div>
  );
};

export default PatientList;
