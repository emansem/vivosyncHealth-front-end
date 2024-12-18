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
import LoadingState from "@/src/components/ui/loading/LoadingState";

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
  // Pagination Logic
  const [totalResult, setTotalResult] = useState(0);
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
    data,
    result,
    handleClearFilter,
    handleOnChange,
    filterTransactionValues,
    isLoading,
    handleSeeMoreBtn,
    stats,
    mobileTransactions
  } = useGetAllTransactions(pageNumber, setPageNumber);
  useEffect(() => {
    setTotalResult(result as number);
  }, [result]);

  return (
    <div className="space-y-6">
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

      {/* Stats Overview */}
      <StatsOverview stats={stats} />

      {/* Filters */}
      <FilterTransaction
        handleClearFilter={handleClearFilter}
        filterTransactionValues={filterTransactionValues}
        handleOnChange={handleOnChange}
      />
      {isLoading && <LoadingState />}

      {/* Transactions Table - Desktop */}
      {!isLoading && (
        <div>
          <TransactionDesktop
            startIndex={startIndex}
            endIndex={endIndex}
            pages={pages}
            getPageNumber={getPageNumber}
            pageNumber={pageNumber}
            handleNextButton={handleNextButton}
            handlePrevButton={handlePrevButton}
            totalResult={totalResult}
            transactions={data?.data.transactions as Transactions[]}
          />

          {/* Transactions List - Mobile */}
          <TransactionListMobile
            handleSeeMoreBtn={handleSeeMoreBtn}
            transactions={mobileTransactions}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
