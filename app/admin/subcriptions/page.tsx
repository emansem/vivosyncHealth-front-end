"use client";
import { StatsCard } from "./_subscriptionContent/StatusCard";
import SubscriptionDesktopView from "./_subscriptionContent/SubscriptionDesktopView";
import SubscriptionMobileView from "./_subscriptionContent/SubscriptionMobileView";
import FIlterSection from "./_subscriptionContent/FIlterSection";
import { useAdminSubscription } from "@/src/hooks/admin/useSubscription";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { useEffect, useState } from "react";
import NoResults from "@/src/components/ui/noFound/EmptyResult";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";

// Sample subscription data
export const subscriptions = [
  {
    id: "SUB001",
    customerName: "Dr. Sarah Johnson",
    planName: "Premium Plan",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
    amount: "$299/year",
    lastPayment: "2024-01-15",
    autoRenewal: true
  },
  {
    id: "SUB002",
    customerName: "Dr. Michael Chen",
    planName: "Basic Plan",
    status: "pending",
    startDate: "2024-02-01",
    endDate: "2025-02-01",
    amount: "$199/year",
    lastPayment: "2024-02-01",
    autoRenewal: true
  }
];
const SubscriptionManagement = () => {
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
  // Stats data structure

  const {
    isLoading,
    stats,
    handleOnChange,
    subscriptionData,
    totalSubscription,
    mobileSubscription,
    filterSubscriptionValues
  } = useAdminSubscription(pageNumber, setPageNumber);
  useEffect(() => {
    setTotalResult(totalSubscription as number);
  }, [totalSubscription]);
  const shouldShowData =
    !isLoading &&
    (mobileSubscription.length !== 0 || subscriptionData.length !== 0);
  const shouldShowNoResult =
    !isLoading &&
    (mobileSubscription.length === 0 || subscriptionData.length === 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Subscription Management
        </h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search */}
      <FIlterSection
        handleOnChange={handleOnChange}
        filterSubscriptionValues={filterSubscriptionValues}
      />
      {isLoading && <InnerPageLoader />}
      {shouldShowNoResult && (
        <NoResults
          heading="No Subscription Found"
          message="We couldn't find any subscription"
        />
      )}

      {shouldShowData && (
        <>
          {/* Subscription Table - Desktop */}
          <SubscriptionDesktopView
            subscriptions={subscriptionData}
            startIndex={startIndex}
            endIndex={endIndex}
            pages={pages}
            getPageNumber={getPageNumber}
            pageNumber={pageNumber}
            handleNextButton={handleNextButton}
            handlePrevButton={handlePrevButton}
            totalResult={totalResult}
          />

          {/* Subscription Cards - Mobile */}
          <SubscriptionMobileView subscriptions={mobileSubscription} />
        </>
      )}
    </div>
  );
};

export default SubscriptionManagement;
