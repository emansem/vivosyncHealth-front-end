"use client"; // Marks this as a client-side component

import React, { useEffect, useState } from "react";
import {
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Search,
  Loader
} from "lucide-react";
import { useTransactions } from "@/src/hooks/useTransactions";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import TransactionMobileView from "./_transactionsContent/TransactionMobileView";
import { Transactions } from "@/app/lib/types";
import TransactionDeskTopView from "./_transactionsContent/TransactionDeskTopView";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import PaginationButton from "@/src/components/utils/table/Pagination";

// Type definitions for transaction types and status
export type TransactionType = "subscription" | "withdrawal" | "deposit";
export type TransactionStatus = "completed" | "pending" | "failed";

export default function TransactionPage() {
  // State to track total results for pagination
  const [result, setResult] = useState(0);

  // Custom hook for pagination functionality
  const {
    pageNumber,
    pages,
    handlePrevButton,
    startIndex,
    endIndex,
    getPageNumber,
    handleNextButton
  } = usePaginationHook(result);

  // Fetch transactions data using custom hook
  const { transactionsData, totalItems, isLoading } =
    useTransactions(pageNumber);

  // Update total results when data changes
  useEffect(() => {
    setResult(totalItems as number);
  }, [totalItems]);

  // Calculate total pages (10 items per page)
  const totalPages = Math.ceil((totalItems as number) / 10);

  // Check if current page is valid
  const shouldShowPagination =
    transactionsData &&
    (pageNumber === totalPages || transactionsData.length >= 10);

  // States for filtering and search functionality
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all"
  );
  const [dateRange, setDateRange] = useState<string>("all");

  // Helper function to return appropriate icon based on transaction type
  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case "subscription":
        return <CreditCard className="w-4 h-4 text-primary" />;
      case "withdrawal":
        return <ArrowUpFromLine className="w-4 h-4 text-red-500" />;
      case "deposit":
        return <ArrowDownToLine className="w-4 h-4 text-green-500" />;
    }
  };

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
            {/* Search Input with Icon */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Transaction Type Filter Dropdown */}
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as TransactionType | "all")
              }
            >
              <option value="all">All Types</option>
              <option value="subscription">Subscription</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="deposit">Deposit</option>
            </select>

            {/* Transaction Status Filter Dropdown */}
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as TransactionStatus | "all")
              }
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>

            {/* Date Range Filter Dropdown */}
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area - Contains both desktop and mobile views */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop View Component */}
        <div>
          <TransactionDeskTopView
            startIndex={startIndex}
            endIndex={endIndex}
            getTransactionIcon={getTransactionIcon}
            filteredTransactions={transactionsData as Transactions[]}
          />
          {/* Pagination - Only shown when there are 10 or more items */}
          {shouldShowPagination && (
            <div className="px-6">
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
        <TransactionMobileView
          getTransactionIcon={getTransactionIcon}
          filteredTransactions={transactionsData as Transactions[]}
        />
      </div>
    </div>
  );
}
