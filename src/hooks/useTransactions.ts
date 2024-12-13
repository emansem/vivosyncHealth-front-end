import { GENERAL_API_END_POINTS } from "@/app/lib/constant"
import { Transactions } from "@/app/lib/types"
import { useGetData } from "./serviceHook"
import axios from "axios"
import { TransactionType } from "@/app/doctor/transaction/page"
import { ChangeEvent, useState } from "react"

interface TransactionsApiResponse {
    data: {
        transactions: Transactions[]
    },
    totalItems: number
}

export const useTransactions = (pageNumber: number) => {
    // States for filtering and search functionality

    const [typeFilter, setTypeFilter] = useState<TransactionType | "all">("all");
    const [dateRange, setDateRange] = useState<string>("all");



    const getAllTranasactionsEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_TRANSACTIONS}/?page=${pageNumber}&limit=10&type=${typeFilter}`
    const { data, error, isLoading } = useGetData<TransactionsApiResponse>(getAllTranasactionsEndPoint, 'transactions');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching transactions data", error.response?.data)

    }

    const handleTypeFilter = (e: ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value as TransactionType || 'all')
    const handleDateRange = (e: ChangeEvent<HTMLSelectElement>) => setDateRange(e.target.value)




    return { filterTransaction: data?.data.transactions, handleDateRange, handleTypeFilter, dateRange, typeFilter, isLoading, totalItems: data?.totalItems }

}