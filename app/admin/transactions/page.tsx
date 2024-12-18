"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/src/components/utils/Button";
import { Download } from "lucide-react";
import StatsOverview from "./_TransactionsContent/StatsOverview";
import FilterTransaction from "./_TransactionsContent/FilterTransaction";
import TransactionDesktop from "./_TransactionsContent/TransactionDesktop";
import TransactionListMobile from "./_TransactionsContent/TransactionListMobile";
import { useGetAllTransactions } from "@/src/hooks/admin/useTransactions";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { Transactions } from "@/app/lib/types";
import NoResults from "@/src/components/ui/noFound/EmptyResult";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";

export const transactions = [
  {
    id: "TRX001",
    type: "deposit",
    amount: 299.0,
    currency: "USD",
    status: "completed",
    date: "2024-03-15T10:30:00",
    customer: {
      name: "Dr. Sarah Johnson",
      id: "DOC123"
    },
    description: "Premium Plan Subscription Payment",
    paymentMethod: "Credit Card (**** 1234)"
  },
  {
    id: "TRX002",
    type: "refund",
    amount: 199.0,
    currency: "USD",
    status: "processing",
    date: "2024-03-14T15:45:00",
    customer: {
      name: "Dr. Michael Chen",
      id: "DOC124"
    },
    description: "Service Cancellation Refund",
    paymentMethod: "Original Payment Method"
  },
  {
    id: "TRX003",
    type: "subscription",
    amount: 499.0,
    currency: "USD",
    status: "completed",
    date: "2024-03-13T09:15:00",
    customer: {
      name: "Dr. Emily Wilson",
      id: "DOC125"
    },
    description: "Annual Plan Subscription",
    paymentMethod: "Credit Card (**** 5678)"
  }
];

const TransactionManagement = () => {
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

  // Get transaction data and related functionality
  // This includes the transaction lists, loading states, and filter handlers
  const {
    result,
    isPending,
    transactions,
    handleClearFilter,
    handleOnChange,
    filterTransactionValues,
    isLoading,
    handleSeeMoreBtn,
    stats,
    preservedTotalResult,
    mobileTransactions
  } = useGetAllTransactions(pageNumber, setPageNumber);

  // Update total results when the data changes
  // This keeps pagination in sync with filtered results
  useEffect(() => {
    setTotalResult(result as number);
  }, [result]);

  // Determine when to show content based on loading states
  // Content shows when either:
  const isStableState = !isLoading && !isPending;
  const hasExistingDataWhilePending =
    (isPending && transactions && transactions?.length > 0) ||
    mobileTransactions.length > 0;
  const shouldShowContent = isStableState || hasExistingDataWhilePending;

  // Show loading spinner only during initial data fetch
  const showLoader = isLoading && !isPending;

  // Show "No Results" when we've finished loading and have no transactions
  const hasNoTransactions =
    !isLoading && transactions?.length === 0 && mobileTransactions.length === 0;

  return (
    <div className="space-y-6">
      {/* Header with page title and export button */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Transaction Management
        </h1>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Display overview statistics cards */}
      <StatsOverview stats={stats} />

      {/* Transaction filter controls */}
      <FilterTransaction
        handleClearFilter={handleClearFilter}
        filterTransactionValues={filterTransactionValues}
        handleOnChange={handleOnChange}
      />

      {/* Show loader during initial data fetch */}
      {showLoader && <InnerPageLoader />}

      {/* Show "No Results" message when appropriate */}
      {hasNoTransactions && (
        <NoResults
          heading="No Transaction Found"
          message="We couldn't find any transaction"
        />
      )}

      {/* Main content area - shows when we have data to display */}
      {shouldShowContent && (
        <div>
          {/* Desktop view with full transaction table */}
          <TransactionDesktop
            startIndex={startIndex}
            endIndex={endIndex}
            pages={pages}
            getPageNumber={getPageNumber}
            pageNumber={pageNumber}
            handleNextButton={handleNextButton}
            handlePrevButton={handlePrevButton}
            totalResult={totalResult}
            transactions={transactions as Transactions[]}
          />

          {/* Mobile view with simplified transaction list and "See More" functionality */}
          <TransactionListMobile
            totalResult={preservedTotalResult}
            isPending={isPending}
            handleSeeMoreBtn={handleSeeMoreBtn}
            transactions={mobileTransactions}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
