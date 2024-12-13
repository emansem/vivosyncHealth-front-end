"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Patient } from "@/src/types/general";
import { PATIENT_FIELDS } from "@/data/table";
import { useGetUser } from "@/src/hooks/serviceHook";
import { useGetAllSubscriptionData } from "@/src/hooks/useGetAllSubscriptionData";
import usePaginationHook from "@/src/hooks/usePaginationHook";

// Component imports
import { TableTabArea } from "./_patientListContent/FilterArea";
import { DesktopTable } from "./_patientListContent/TableDeskTopVersion";
import { MobileSubscriptionTableLyaout } from "./_patientListContent/DoctorMobileSubscritionTable";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

/**
 * SubscriptionPage Component
 * Displays a list of subscriptions with filtering and pagination capabilities
 * Handles both desktop and mobile layouts
 */
function SubscriptionPage() {
  // State Management
  const [result, setResult] = useState(0); // Total number of results
  const [subscriptions, setSubscriptions] = useState<Patient[]>([]); // Current page subscription data

  // URL Parameters and User Data
  const searchParams = useSearchParams();
  const filterTag = (searchParams.get("filter") as string) || "All"; // Get filter from URL
  const { data: userData } = useGetUser(); // Fetch user data

  // Pagination Logic
  const {
    pageNumber,
    pages,
    handlePrevButton,
    startIndex,
    endIndex,
    getPageNumber,
    handleNextButton,
    setPageNumber
  } = usePaginationHook(result);

  // Subscription Data Fetching
  const {
    subscriptionData,
    handleFilterPlanType,
    filterPlanType,
    totalItems,
    isLoading
  } = useGetAllSubscriptionData(
    pageNumber,
    filterTag,
    userData?.data.user.user_type as string
  );

  // Effect: Reset page number when filter changes
  useEffect(() => {
    setPageNumber(1); // Reset to first page on filter change
  }, [filterTag, setPageNumber]);

  // Effect: Update total results count
  useEffect(() => {
    setResult(totalItems as number);
  }, [totalItems]);

  // Effect: Update subscription data when data or page changes
  useEffect(() => {
    setSubscriptions(subscriptionData as Patient[]);
  }, [subscriptionData, pageNumber]);

  // Dynamic message for no results state
  const noResultsMessage =
    filterPlanType.toLowerCase() !== "all" && filterTag !== "All"
      ? `No subscriptions found for "${filterPlanType}" plan`
      : "You do not have any subscriptions yet";

  // Loading State
  if (isLoading) {
    return <LoadingState message="Loading subscriptions..." />;
  }

  // Render Component
  return (
    <div className="flex flex-col gap-4">
      {/* Filter Section */}
      <div>
        <TableTabArea
          statusTag={filterTag}
          value={filterPlanType}
          handleFilterPlanType={handleFilterPlanType}
        />
      </div>

      {/* No Results Message */}
      {subscriptions?.length === 0 && <NoResults message={noResultsMessage} />}

      {/* Data Display Section */}
      {subscriptions?.length !== 0 && (
        <div>
          {/* Desktop View */}
          <div className="hidden md:block">
            <DesktopTable
              startIndex={startIndex}
              endIndex={endIndex}
              pages={pages}
              getPageNumber={getPageNumber}
              pageNumber={pageNumber}
              subscriptionData={subscriptions as Patient[]}
              handleNextButton={handleNextButton}
              handlePrevButton={handlePrevButton}
              totalResult={result}
            />
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <MobileSubscriptionTableLyaout
              fields={PATIENT_FIELDS}
              data={subscriptions as Patient[]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscriptionPage;
