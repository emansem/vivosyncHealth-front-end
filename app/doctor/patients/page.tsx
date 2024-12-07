"use client";

import { PATIENT_FIELDS } from "@/data/table";

import { TableTabArea } from "./_patientListContent/FilterArea";
import { DesktopTable } from "./_patientListContent/TableDeskTopVersion";
import { Patient } from "@/src/types/general";
import { useEffect, useState } from "react";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { useGetAllDoctorSubscriptionData } from "@/src/hooks/useGetAllDoctorSubscriptionData";
import { MobileSubscriptionTableLyaout } from "./_patientListContent/DoctorMobileSubscritionTable";

function PatientList() {
  const [result, setResult] = useState(0);
  const {
    pageNumber,
    pages,

    handlePrevButton,
    startIndex,
    endIndex,
    getPageNumber,
    handleNextButton
  } = usePaginationHook(result);

  const { subscriptionData, isLoading } =
    useGetAllDoctorSubscriptionData(pageNumber);

  useEffect(() => {
    setResult(subscriptionData?.length as number);
  }, [result, subscriptionData]);

  if (isLoading) return <div>Loading....</div>;
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <TableTabArea />
      </div>
      <div className="hidden md:block">
        <DesktopTable
          startIndex={startIndex}
          endIndex={endIndex}
          pages={pages}
          getPageNumber={getPageNumber}
          pageNumber={pageNumber}
          subscriptionData={subscriptionData as Patient[]}
          handleNextButton={handleNextButton}
          handlePrevButton={handlePrevButton}
          totalResult={result}
        />
      </div>
      <div className="md:hidden">
        <MobileSubscriptionTableLyaout
          fields={PATIENT_FIELDS}
          data={subscriptionData as Patient[]}
        />
      </div>
    </div>
  );
}

export default PatientList;
