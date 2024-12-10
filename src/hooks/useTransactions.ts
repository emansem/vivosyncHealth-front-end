import { GENERAL_API_END_POINTS } from "@/app/lib/constant"
import { Transactions } from "@/app/lib/types"
import { useGetData } from "./serviceHook"
import axios from "axios"

interface TransactionsApiResponse {
    data: {
        transactions: Transactions[]
    }
}

export const useTransactions = (pageNumber: number) => {
    const getAllTranasactionsEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_TRANSACTIONS}/?page=${pageNumber}&limit=10`
    const { data, error, isLoading } = useGetData<TransactionsApiResponse>(getAllTranasactionsEndPoint, 'transactions');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching transactions data", error.response?.data)

    }

    console.log("All transaction details", data)

    return { transactionsData: data?.data.transactions, isLoading }

}