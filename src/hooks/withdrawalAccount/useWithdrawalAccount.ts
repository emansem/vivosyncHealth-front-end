import { ChangeEvent, useEffect, useState } from "react";
import { useApiPost, useGetData, useUpdateData } from "../serviceHook"
import axios from "axios";
import { useForm } from "react-hook-form";
import { withdrawalAccountFormValidation } from "@/src/helper/formValidation";
import { WithdrawalAccountData } from "@/app/lib/types";
import { DOCTOR_API_END_POINTS, GET_WITHDRAWAL_ACCOUNT_QUERY_KEY } from "@/app/lib/constant";

// Interface for the API response when fetching withdrawal account
interface WithdrawalAccountApiRespone {
    data: {
        account: WithdrawalAccountData
    }
}

/**
* Hook to fetch and manage the doctor's withdrawal account data
* Handles loading states and no-account scenarios
*/
export const useGetWwithdrawalAccount = () => {
    const [noAccount, setNoaccount] = useState(false)
    const [isPending, setIspending] = useState(true)

    // Fetch withdrawal account data
    const { data, error, isLoading } = useGetData<WithdrawalAccountApiRespone>(
        DOCTOR_API_END_POINTS.WITHDRAWAL_ACCOUNT.GET_WITHDRAWAL_ACCOUNT,
        GET_WITHDRAWAL_ACCOUNT_QUERY_KEY
    )

    // Handle case when no account exists
    useEffect(() => {
        if (axios.isAxiosError(error)) {
            const { account } = error.response?.data
            if (account === null) {
                setNoaccount(true)
                setIspending(false)
            }
        }
    }, [error])

    // Reset no-account state when data is received
    useEffect(() => {
        if (data) {
            setNoaccount(false)
        }
    }, [data])

    return { data, isLoading, isPending, noAccount }
}

/**
* Hook to handle the creation of a new withdrawal account
* Manages form state and submission
*/
export const useAddWithdrawalAccount = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<WithdrawalAccountData>();

    // Mutation hook for creating account
    const { mutate, isPending } = useApiPost<WithdrawalAccountData, WithdrawalAccountData>(
        DOCTOR_API_END_POINTS.WITHDRAWAL_ACCOUNT.CREATE_WITHDRAWAL_ACCOUNT,
        GET_WITHDRAWAL_ACCOUNT_QUERY_KEY
    )

    // Register form fields with validation
    const registerFields: Record<keyof WithdrawalAccountData, ReturnType<typeof register>> = {
        bank_name: register("bank_name", withdrawalAccountFormValidation.bank_name),
        account_number: register("account_number", withdrawalAccountFormValidation.account_number),
        account_name: register("account_name", withdrawalAccountFormValidation.account_name),
        withdrawal_password: register("withdrawal_password", withdrawalAccountFormValidation.withdrawal_password),
    }

    // Handle form submission
    const onSubmit = async (data: WithdrawalAccountData) => {
        if (data) {
            mutate(data)
        }
    };

    return { registerFields, handleSubmit: handleSubmit(onSubmit), isPending, errors, isSubmitting }
}

/**
* Hook to manage updating an existing withdrawal account
* Handles form state and submission for updates
*/
export const useUpdateWithdrawalAccount = () => {
    // Get current account data
    const { data } = useGetWwithdrawalAccount()

    // Local state for form data
    const [accountData, setAccountData] = useState<Partial<WithdrawalAccountData>>({
        bank_name: "",
        account_name: "",
        account_number: 0,
        withdrawal_password: ''
    })

    // Mutation hook for updating account
    const { mutate, isPending } = useUpdateData<WithdrawalAccountData, WithdrawalAccountData>(
        DOCTOR_API_END_POINTS.WITHDRAWAL_ACCOUNT.UPDATE_WITHDRAWAL_ACCOUNT,
        GET_WITHDRAWAL_ACCOUNT_QUERY_KEY
    )

    // Update local state when data is fetched
    useEffect(() => {
        setAccountData(data?.data.account as WithdrawalAccountData)
    }, [data])

    // Handle input changes
    const handleUpdateAccountInputs = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccountData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle form submission
    const handleSubmit = () => {
        if (accountData) {
            mutate(accountData as WithdrawalAccountData)
        }
    }

    return { accountData, isPending, handleSubmit, handleUpdateAccountInputs }
}