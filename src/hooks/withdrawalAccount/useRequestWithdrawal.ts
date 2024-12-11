import { useState } from "react";
import toast from "react-hot-toast";
import { useGetWwithdrawalAccount } from "./useWithdrawalAccount";

// Types for our form data and props
interface WithdrawalFormData {
    amount: string;
    password: string;
}
export const useRequestWithdrawal = () => {
    const { data } = useGetWwithdrawalAccount()
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

        console.log("Withdrawal requested:", formData);
    };

    return { handleSubmit, accountName, accountNumber, handleInputChange }
}