import { Transactions } from "@/app/lib/types";
import { useGetData } from "../serviceHook";
import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { ChangeEvent, useEffect, useState } from "react";

// Shape of data we expect from the API
interface ApiResponse {
  totalResult: number;
  totalRevenue: number;
  revenueDifference: string;
  todayTransactionAmount: number;
  totalTransactionsToday: number;
  data: {
    transactions: Transactions[];
  };
}

// Structure for tracking active filters
export interface FIlterTransaction {
  type: string;
  status: string;
  startDate: string;
  endDate: string;
}

// Start with empty filters when component loads
const DEFAULT_FILTERS: FIlterTransaction = {
  type: "",
  status: "",
  startDate: "",
  endDate: ""
};

// Manages filter state and actions - keeps track of what filters user has applied
export const useFilterTransaction = () => {
  // Store current filter selections
  const [filterTransactionValues, setFilterTransactionValues] =
    useState<FIlterTransaction>(DEFAULT_FILTERS);

  // Update filters when user changes any input field
  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterTransactionValues((prev) => ({ ...prev, [name]: value }));
  };

  // Clear all active filters back to empty state
  const handleClearFilter = () => {
    setFilterTransactionValues((prev) => ({
      ...prev,
      startDate: "",
      type: "",
      endDate: "",
      status: ""
    }));
  };

  return { filterTransactionValues, handleClearFilter, handleOnChange };
};

// Main hook that handles all transaction data loading and state management
export const useGetAllTransactions = (
  page?: number,
  setPageNumber?: React.Dispatch<React.SetStateAction<number>>
) => {
  // Get filter functionality
  const { filterTransactionValues, handleClearFilter, handleOnChange } =
    useFilterTransaction();
  const { startDate, status, endDate, type } = filterTransactionValues;

  // Build API URL with current page and active filters
  const adminApiEndPoint = `${
    ADMIN_API_END_POINT.getAllTransactions
  }/?page=${page}&limit=${10}&type=${type}&startDate=${startDate}&endDate=${endDate}&status=${status}`;

  // Load transaction data from API
  const { data, isLoading } = useGetData<ApiResponse>(
    adminApiEndPoint,
    "transactions"
  );

  // Track loading states and mobile transaction list
  const [isPending, setIsPending] = useState(false);
  //  const [preservedTotalResult, setPreservedTotalResult] = useState(0);
  const [mobileTransactions, setMobileTransaction] = useState<Transactions[]>(
    []
  );
  const [preservedTotalResult, setPreservedTotalResult] = useState(0);

  // Go back to first page whenever filters change
  useEffect(() => {
    if (setPageNumber) {
      setPageNumber(1);
    }
  }, [filterTransactionValues, setPageNumber]);

  // Calculate total pages needed for pagination
  const totalResult = data?.totalResult ?? 0;
  const totalPages = Math.ceil(totalResult / 10);

  // Update mobile transaction list when new data arrives
  useEffect(() => {
    setIsPending(true);
    if (data?.data?.transactions) {
      // First page resets the list, subsequent pages add to it
      if (page === 1) {
        setMobileTransaction(data.data.transactions);
      } else {
        setMobileTransaction((prev) => [...prev, ...data.data.transactions]);
      }
      setIsPending(false);
    }
  }, [data, page]);

  // Load more transactions when user clicks "See More"
  const handleSeeMoreBtn = () => {
    if (page && setPageNumber && page < totalPages) {
      const nextPage = page + 1;
      setPageNumber(nextPage);
      setIsPending(true);
    }
  };

  // Prepare stats for the overview cards
  const stats = [
    {
      title: "Total Revenue",
      value: data?.totalRevenue || 0.0,
      change: data?.revenueDifference || "0",
      period: "vs last month"
    },
    {
      title: "Pending Refunds",
      value: 1240,
      count: "8 requests"
    },
    {
      title: "Today's Transactions",
      value: data?.todayTransactionAmount || 0.0,
      amount: data?.totalTransactionsToday || 0
    }
  ];
  useEffect(() => {
    setPreservedTotalResult(totalResult);
  }, [totalResult, mobileTransactions]);

  // Return everything needed by the UI
  return {
    stats,
    handleClearFilter,
    isPending,
    handleOnChange,
    totalRevenue: data?.totalRevenue || 0.0,
    totalRevenueTrend: data?.revenueDifference || "0",
    preservedTotalResult,
    filterTransactionValues,
    result: totalResult,
    isLoading,
    handleSeeMoreBtn,
    transactions: data?.data.transactions,
    mobileTransactions
  };
};
