"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/src/components/utils/Card";

import { User, CheckCircle, Clock } from "lucide-react";

import { colors } from "@/app/lib/constant";
import DeskTopView from "./_doctorContents/DeskTopView";
import FilterSection from "./_doctorContents/FilterSection";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { useGetDoctorList } from "@/src/hooks/admin/useDoctors";

// Stats Card Component
const StatsCard = ({ title, value, icon, color, bgColor }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
        {React.cloneElement(icon, { size: 24, color: color })}
      </div>
    </div>
  </Card>
);

const DoctorsList = () => {
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
    totalDoctors,
    doctors,
    totalResult: result,
    handleClearFilter,
    filterValues,
    handleOnChange
  } = useGetDoctorList(pageNumber, setPageNumber);

  const stats = [
    {
      title: "Total Doctors",
      value: totalDoctors || 0,
      icon: <User />,
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Online Now",
      value: "52",
      icon: <CheckCircle />,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Pending Verification",
      value: "12",
      icon: <Clock />,
      color: "#FF9800",
      bgColor: "#FFF3E0"
    }
  ];

  // Update total results when the data changes
  // This keeps pagination in sync with filtered results
  useEffect(() => {
    setTotalResult(result as number);
  }, [result]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Doctor Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      {/* Search and filter section */}
      <FilterSection
        handleClearFilter={handleClearFilter}
        filterValues={filterValues}
        handleOnChange={handleOnChange}
      />

      {/* Desktop View */}
      <DeskTopView
        startIndex={startIndex}
        endIndex={endIndex}
        pages={pages}
        doctors={doctors}
        getPageNumber={getPageNumber}
        pageNumber={pageNumber}
        handleNextButton={handleNextButton}
        handlePrevButton={handlePrevButton}
        totalResult={totalResult}
      />

      {/* Mobile  View */}
      {/* <MobileView /> */}
    </div>
  );
};

export default DoctorsList;
