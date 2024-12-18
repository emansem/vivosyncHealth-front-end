import { Transactions } from "@/app/lib/types";
import { useGetData } from "../serviceHook";
import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { ChangeEvent, useEffect, useState } from "react";

// API response structure
interface TransactionApiResponse {
  totalResult: number;
  totalRevenue: number;
  revenueDifference: string;
  todayTransactionAmount: number;
  totalTransactionsToday: number;
  data: {
    transactions: Transactions[];
  };
}
export interface FIlterTransaction {
  type: string;
  status: string;
  startDate: string;
  endDate: string;
}

const INITIAL_FILTER_TRANSACTION_VALUES: FIlterTransaction = {
  type: "",
  status: "",
  startDate: "",
  endDate: ""
};
export const useFilterTransaction = () => {
  const [filterTransactionValues, setFilterTransactionValues] =
    useState<FIlterTransaction>(INITIAL_FILTER_TRANSACTION_VALUES);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterTransactionValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleClearFilter = () => {
    setFilterTransactionValues((prev) => ({
      ...prev,
      startDate: "",
      type: "",
      endDate: "",
      status: ""
    }));
  };

  console.log("filter values", filterTransactionValues);
  return { filterTransactionValues, handleClearFilter, handleOnChange };
};

// Custom hook for fetching and managing paginated transactions
export const useGetAllTransactions = (
  page: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  const { filterTransactionValues, handleClearFilter, handleOnChange } =
    useFilterTransaction();
  const { startDate, status, endDate, type } = filterTransactionValues;
  // API endpoint with pagination
  const adminApiEndPoint = `${
    ADMIN_API_END_POINT.getAllTransactions
  }/?page=${page}&limit=${10}&type=${type}&startDate=${startDate}&endDate=${endDate}&status=${status}`;

  // Fetch data for current page
  const { data, isLoading, isError } = useGetData<TransactionApiResponse>(
    adminApiEndPoint,
    "transactions"
  );
  useEffect(() => {
    setPageNumber(1);
  }, [filterTransactionValues, setPageNumber]);

  // State for managing mobile view transactions
  const [mobileTransactions, setMobileTransaction] = useState<Transactions[]>(
    []
  );

  // Calculate pagination values
  const totalResult = data?.totalResult ?? 0;
  const totalPages = Math.ceil(totalResult / 10);

  // Handle transaction data updates
  useEffect(() => {
    if (data?.data?.transactions) {
      if (page === 1) {
        setMobileTransaction(data.data.transactions);
      } else {
        setMobileTransaction((prev) => [...prev, ...data.data.transactions]);
      }
    }
  }, [data, page]);
  console.log("transactions", mobileTransactions);

  // Handle "See More" button click
  const handleSeeMoreBtn = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPageNumber(nextPage);
    }
  };

  const revenueDifference = data?.revenueDifference as string;
  const totalRevenue = data?.totalRevenue as number;
  const totalTransactionsToday = data?.totalTransactionsToday as number;
  const todayTransactionAmount = data?.todayTransactionAmount as number;

  const stats = [
    {
      title: "Total Revenue",
      value: totalRevenue || 0.0,
      change: revenueDifference || 0,
      period: "vs last month"
    },
    {
      title: "Pending Refunds",
      value: 1240,
      count: "8 requests"
    },
    {
      title: "Today's Transactions",
      value: todayTransactionAmount || 0.0,
      amount: totalTransactionsToday | 0
    }
  ];
  return {
    stats,
    handleClearFilter,

    handleOnChange,
    filterTransactionValues,
    data,
    result: totalResult,
    isLoading,
    handleSeeMoreBtn,
    mobileTransactions
  };
};
