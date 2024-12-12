"use client";

import { PATIENT_FIELDS } from "@/data/table";

import { TableTabArea } from "./_patientListContent/FilterArea";
import { DesktopTable } from "./_patientListContent/TableDeskTopVersion";
import { Patient } from "@/src/types/general";
import { useEffect, useState } from "react";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { MobileSubscriptionTableLyaout } from "./_patientListContent/DoctorMobileSubscritionTable";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import NoResults from "@/src/components/ui/noFound/EmptyResult";
import { useSearchParams } from "next/navigation";
import { useGetUser } from "@/src/hooks/serviceHook";
import { useGetAllSubscriptionData } from "@/src/hooks/useGetAllSubscriptionData";

function SubscriptionPage() {
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
  const searchParams = useSearchParams();
  const filterTag = searchParams.get("filter") as string;

  const { data } = useGetUser();

  const {
    subscriptionData,
    handleFilterPlanType,
    filterPlanType,
    totalItems,
    isLoading
  } = useGetAllSubscriptionData(
    pageNumber,
    filterTag,
    data?.data.user.user_type as string
  );

  useEffect(() => {
    setResult(totalItems as number);
  }, [totalItems]);

  const message =
    filterPlanType.toLowerCase() !== "all" && filterTag !== "All"
      ? `No subscriptions found for  "${filterPlanType}" plan`
      : "You do not have any subscriptions yet";

  if (isLoading) return <LoadingState message="Loading subscriptions..." />;

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <TableTabArea
          value={filterPlanType}
          handleFilterPlanType={handleFilterPlanType}
        />
      </div>

      {subscriptionData?.length === 0 && <NoResults message={message} />}

      {subscriptionData?.length !== 0 && (
        <div>
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
      )}
    </div>
  );
}

export default SubscriptionPage;
