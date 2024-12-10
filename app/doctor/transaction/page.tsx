"use client";

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

export type TransactionType = "subscription" | "withdrawal" | "deposit";
export type TransactionStatus = "completed" | "pending" | "failed";

export default function TransactionPage() {
  const [result, setResult] = useState(0);
  const {
    pageNumber
    // pages,
    // handlePrevButton,
    // startIndex,
    // endIndex,
    // getPageNumber,
    // handleNextButton
  } = usePaginationHook(result);

  const { transactionsData, isLoading } = useTransactions(pageNumber);
  useEffect(() => {
    setResult(transactionsData?.length as number);
  }, [result, transactionsData]);

  // States for filters and search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all"
  );
  const [dateRange, setDateRange] = useState<string>("all");

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

  // const filteredTransactions = transactions.filter((transaction) => {
  //   const matchesSearch =
  //     transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     transaction.amount.toString().includes(searchQuery);
  //   const matchesType = typeFilter === "all" || transaction.type === typeFilter;
  //   const matchesStatus =
  //     statusFilter === "all" || transaction.status === statusFilter;
  //   return matchesSearch && matchesType && matchesStatus;
  // });
  if (isLoading)
    return (
      <div className="flex gap-1 text-center justify-center h-screen items-center">
        <Loader className="animate-spin" />
        <span className="text-lg text-text_color2 font-medium">
          Please wait...
        </span>
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

        {/* Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
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

            {/* Type Filter */}
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

            {/* Status Filter */}
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

            {/* Date Range Filter */}
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

      {/* Transaction Table - Responsive */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <TransactionDeskTopView
          getTransactionIcon={getTransactionIcon}
          filteredTransactions={transactionsData as Transactions[]}
        />

        {/* Mobile View */}
        <TransactionMobileView
          getTransactionIcon={getTransactionIcon}
          filteredTransactions={transactionsData as Transactions[]}
        />
      </div>
    </div>
  );
}
