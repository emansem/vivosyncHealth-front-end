import { useState } from "react";
import toast from "react-hot-toast";
import { useGetWwithdrawalAccount } from "./useWithdrawalAccount";
import { useApiPost } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import axios from "axios";

// Types for our form data and props
interface WithdrawalFormData {
    amount: string;
    password: string;
}
export const useRequestWithdrawal = () => {
    const { data } = useGetWwithdrawalAccount()
    const { data: withdrawalDetails, isPending, error, mutate } = useApiPost(GENERAL_API_END_POINTS.REQUEST_NEW_WITHDRAWAL, 'withdrawalDetails')
    // Initialize form state
    const [formData, setFormData] = useState<WithdrawalFormData>({
        amount: "",
        password: ""
    });

    const accountName = data?.data?.account.account_name
    const accountNumber = data?.data.account.account_number

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(formData).some(item => !item)) {
            return toast.error("All fields are required");
        }
        mutate(formData, {
            onSuccess: (result) => toast.success(result.data.message)
        })


        console.log("Withdrawal requested:", formData);
    };

    if (error && axios.isAxiosError(error)) {
        console.log("Error requesting a withdrawal", error.response?.data)
    }


    return { handleSubmit, accountName, isPending, accountNumber, handleInputChange }
}