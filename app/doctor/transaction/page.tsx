"use client"; // Marks this as a client-side component

import { useEffect, useState } from "react";

import { useTransactions } from "@/src/hooks/useTransactions";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import TransactionMobileView from "./_transactionsContent/TransactionMobileView";
import TransactionDeskTopView from "./_transactionsContent/TransactionDeskTopView";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import PaginationButton from "@/src/components/utils/table/Pagination";
import { CreditCard, ArrowUpFromLine, ArrowDownToLine } from "lucide-react";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import {
  TRANSACTION_FILTER_TYPE,
  TRANSACTION_FILTER_DATE_RANGE
} from "@/app/lib/constant";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

// Type definitions for transaction types and status
export type TransactionType = "subscription" | "withdrawal" | "deposit";

export default function TransactionPage() {
  // State to track total results for pagination
  const [result, setResult] = useState(0);

  // Custom hook for pagination functionality
  const {
    pageNumber,
    pages,
    handlePrevButton,

    endIndex,
    getPageNumber,
    handleNextButton
  } = usePaginationHook(result);

  // Fetch transactions data using custom hook
  const {
    dateRange,
    typeFilter,
    handleDateRange,
    handleTypeFilter,
    totalItems,
    filterTransaction,
    isLoading
  } = useTransactions(pageNumber);

  // Update total results when data changes
  useEffect(() => {
    setResult(totalItems as number);
  }, [totalItems]);

  // Calculate total pages (10 items per page)
  const totalPages = Math.ceil((totalItems as number) / 10);

  // Check if current page is valid
  const shouldShowPagination =
    filterTransaction &&
    (pageNumber === totalPages || filterTransaction.length >= 10);

  // Show loading state while fetching data
  if (isLoading) return <LoadingState message="Loading Transactions..." />;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header Section with Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

        {/* Filter Section - Contains search and filter options */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Transaction Type Filter Dropdown */}
            <div className="w-full">
              <SelectInput
                onChange={handleTypeFilter}
                value={typeFilter}
                id="transactiontype"
                options={TRANSACTION_FILTER_TYPE}
              />
            </div>
            {/* Date Range Filter Dropdown */}
            <div className="w-full">
              <SelectInput
                onChange={handleDateRange}
                value={dateRange}
                id="transactionDateRange"
                options={TRANSACTION_FILTER_DATE_RANGE}
              />
            </div>
          </div>
        </div>
      </div>

      {!filterTransaction?.length && (
        <NoResults
          heading="No Transactions Found"
          message={
            typeFilter === "all"
              ? "You do not have any transactions yet."
              : `No transactions found for type "${typeFilter}".`
          }
        />
      )}

      {/* Main Content Area - Contains both desktop and mobile views */}
      {filterTransaction.length !== 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Desktop View Component */}
          <div>
            <TransactionDeskTopView
              getTransactionIcon={getTransactionIcon}
              filteredTransactions={filterTransaction}
            />
            {/* Pagination - Only shown when there are 10 or more items or the total pages is equal to pageNumber */}
            {shouldShowPagination && (
              <div className="px-6 hidden md:block">
                <PaginationButton
                  pageNumber={pageNumber}
                  totalResult={totalItems as number}
                  result={endIndex}
                  handlePrevButton={handlePrevButton}
                  handleNextButton={handleNextButton}
                  getPageNumber={getPageNumber}
                  pages={pages}
                />
              </div>
            )}
          </div>

          {/* Mobile View Component */}
          <TransactionMobileView filteredTransactions={filterTransaction} />
        </div>
      )}
    </div>
  );
}

// Helper function to return appropriate icon based on transaction type
export const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case "subscription":
      return <CreditCard className="w-4 h-4 text-primary" />;
    case "withdrawal":
      return <ArrowUpFromLine className="w-4 h-4 text-red-500" />;
    case "deposit":
      return <ArrowDownToLine className="w-4 h-4 text-green-500" />;
  }
};
