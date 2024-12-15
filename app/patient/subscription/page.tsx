"use client";
import { Users, CheckCircle, AlertCircle } from "lucide-react";
import { StatsCard } from "@/src/components/utils/StateCard";
import { SubscriptionTable } from "./_subscriptionContent/SubscriptionTable";
import { MOBILE_SUBSCRIPTION_TABLE_HEADER } from "@/app/lib/constant";
import { SubscriptionData } from "@/app/lib/types";
import { useGetSubscriptionData } from "@/src/hooks/useSubscription";
import MobileSubscriptionTableLyaout from "./_subscriptionContent/MobileSubscriptionTableLyaout";
import { SubscriptionFilter } from "./_subscriptionContent/SubscriptionFilter";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { useState, useEffect } from "react";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

const SubscriptionPage = () => {
  const [result, setResult] = useState(0); // Total number of results

  // Pagination Logic
  const {
    pageNumber,
    pages,
    endIndex,
    handlePrevButton,
    getPageNumber,
    handleNextButton,
    setPageNumber
  } = usePaginationHook(result);
  const {
    subscriptionDetails,
    handleOnchange,
    handleResetFilter,
    filterValues,
    isLoading,
    totalResult
  } = useGetSubscriptionData(pageNumber);

  // Effect: Reset page number when filter changes
  useEffect(() => {
    setPageNumber(1); // Reset to first page on filter change
  }, [setPageNumber, filterValues]);

  // Effect: Update total results count
  useEffect(() => {
    setResult(totalResult as number);
  }, [totalResult]);
  // Sample subscription data
  const subscriptionData = subscriptionDetails as SubscriptionData[];
  const expiredSubscriptions = subscriptionData?.filter(
    (subscription) => subscription?.subscription_status === "expired"
  );
  const activeSubscriptions = subscriptionData?.filter(
    (subscription) => subscription?.subscription_status === "active"
  );
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            icon={Users}
            label="Total Subscriptions"
            value={subscriptionData?.length || 0}
          />
          <StatsCard
            icon={CheckCircle}
            label="Active Subscriptions"
            value={activeSubscriptions?.length || 0}
          />
          <StatsCard
            icon={AlertCircle}
            label="Expired Subscriptions"
            value={expiredSubscriptions?.length || 0}
          />
        </div>

        <div>
          <SubscriptionFilter
            filterValues={filterValues}
            handleOnchange={handleOnchange}
            handleResetFilter={handleResetFilter}
          />
        </div>
        {isLoading && <InnerPageLoader />}

        {subscriptionData?.length == 0 && <NoResults />}

        {!isLoading && subscriptionData?.length !== 0 && (
          <div>
            <div className="hidden md:block">
              <SubscriptionTable
                endIndex={endIndex}
                pages={pages}
                getPageNumber={getPageNumber}
                pageNumber={pageNumber}
                handleNextButton={handleNextButton}
                handlePrevButton={handlePrevButton}
                totalResult={result}
                subscriptions={subscriptionData}
              />
            </div>
            <MobileSubscriptionTableLyaout
              fields={MOBILE_SUBSCRIPTION_TABLE_HEADER}
              data={subscriptionData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
