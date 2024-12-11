import { useState } from "react";
import toast from "react-hot-toast";
import { useGetWwithdrawalAccount } from "./useWithdrawalAccount";
import { useApiPost } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import axios from "axios";

// Define the shape of our withdrawal form data
// This ensures type safety throughout the component
interface WithdrawalFormData {
    amount: string;
    password: string;
}

// Custom hook to manage withdrawal request logic and state
// Centralizes all withdrawal-related functionality in one place
export const useRequestWithdrawal = () => {
    // Fetch the user's withdrawal account details 
    // This includes account name, number, and other relevant information
    const { data } = useGetWwithdrawalAccount()

    // Initialize API mutation hook for making withdrawal requests
    // The 'withdrawalDetails' key is used for cache management
    const { isPending, error, mutate } = useApiPost(
        GENERAL_API_END_POINTS.REQUEST_NEW_WITHDRAWAL,
        'withdrawalDetails'
    )

    // Manage form state using useState
    // Initialize with empty strings for both amount and password
    const [formData, setFormData] = useState<WithdrawalFormData>({
        amount: "",
        password: ""
    });

    // Extract account details from the fetched data
    // These will be used to display account information in the form
    const accountName = data?.data?.account.account_name
    const accountNumber = data?.data.account.account_number

    // Handle changes to form inputs
    // Updates the form state while preserving other field values
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    // Validates inputs and makes API request for withdrawal
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate that all fields have values
        // Prevents submission of incomplete form data
        if (Object.values(formData).some(item => !item)) {
            return toast.error("All fields are required");
        }

        // Make API request using the mutation hook
        // On success, display a success message to the user
        mutate(formData, {
            onSuccess: (result) => toast.success(result.data.message)
        })

        // Log the request for debugging purposes
        console.log("Withdrawal requested:", formData);
    };

    // Handle and log any API errors
    // Uses axios error typing for better error handling
    if (error && axios.isAxiosError(error)) {
        console.log("Error requesting a withdrawal", error.response?.data)
    }

    // Return necessary values and functions for the component
    // This allows the component to manage the withdrawal form
    return {
        handleSubmit,
        accountName,
        isPending,
        accountNumber,
        handleInputChange
    }
}