import { useEffect, useState } from "react";
import { useApiPost, useGetData } from "../serviceHook"
import axios from "axios";
import { useForm } from "react-hook-form";
import { withdrawalAccountFormValidation } from "@/src/helper/formValidation";
import { WithdrawalAccountData } from "@/app/lib/types";
import { DOCTOR_API_END_POINTS, GET_WITHDRAWAL_ACCOUNT_QUERY_KEY } from "@/app/lib/constant";
// Types for the withdrawal account data
interface WithdrawalAccountApiRespone {
    data: {
        account: WithdrawalAccountData
    }
}
export const useWithdrawalAccountData = () => {

    const [noAccount, setNoaccount] = useState(false)
    const [isPending, setIspending] = useState(true)

    const { data, error, isLoading } = useGetData<WithdrawalAccountApiRespone>(DOCTOR_API_END_POINTS.WITHDRAWAL_ACCOUNT.GET_WITHDRAWAL_ACCOUNT, GET_WITHDRAWAL_ACCOUNT_QUERY_KEY)
    useEffect(() => {
        if (axios.isAxiosError(error)) {
            const { account } = error.response?.data
            if (account === null) {
                setNoaccount(true)
                setIspending(false)
            }
        }
    }, [error])
    useEffect(() => {
        if (data) {
            setNoaccount(false)
        }
    }, [data])
    console.log(isLoading)

    return { data, isLoading, isPending, noAccount, }
}

//Handle doctor withdrawal account
export const useAddWithdrawalAccount = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<WithdrawalAccountData>();
    const { mutate, isPending } = useApiPost<WithdrawalAccountData, WithdrawalAccountData>(DOCTOR_API_END_POINTS.WITHDRAWAL_ACCOUNT.CREATE_WITHDRAWAL_ACCOUNT, GET_WITHDRAWAL_ACCOUNT_QUERY_KEY)

    const registerFields: Record<keyof WithdrawalAccountData, ReturnType<typeof register>> = {
        bank_name: register("bank_name", withdrawalAccountFormValidation.bank_name),
        account_number: register("account_number", withdrawalAccountFormValidation.account_number),
        account_name: register("account_name", withdrawalAccountFormValidation.account_name),
        withdrawal_password: register("withdrawal_password", withdrawalAccountFormValidation.withdrawal_password),

    }
    const onSubmit = async (data: WithdrawalAccountData) => {
        if (data) {
            mutate(data)
        }
    };

    return { registerFields, handleSubmit: handleSubmit(onSubmit), isPending, errors, isSubmitting }

}