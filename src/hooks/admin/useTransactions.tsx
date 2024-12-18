import { Transactions } from "@/app/lib/types";
import { useGetData } from "../serviceHook";
import { ADMIN_API_END_POINT } from "@/app/lib/constant";
import { useEffect, useState } from "react";

// API response structure
interface TransactionApiResponse {
  totalResult: number;
  data: {
    transactions: Transactions[];
  };
}

// Custom hook for fetching and managing paginated transactions
export const useGetAllTransactions = (
  page: number,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  // API endpoint with pagination
  const adminApiEndPoint = `${
    ADMIN_API_END_POINT.getAllTransactions
  }/?page=${page}&limit=${10}`;

  // Fetch data for current page
  const { data, isLoading, isError } = useGetData<TransactionApiResponse>(
    adminApiEndPoint,
    "transactions"
  );

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

  return {
    data,
    result: totalResult,
    isLoading,
    handleSeeMoreBtn,
    mobileTransactions
  };
};
