"use client"

import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useApiPost } from "../serviceHook";

export const useForgotPassword = () => {
    const apiEndpoint = "/auth/forgot-password"

    const [email, setEmail] = useState("");
    const { mutate, isPending } = useApiPost(apiEndpoint)

    const getUserEmailAddress = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };
    const handleSubmitForgotPasswordForm = () => {
        if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            return toast.error("Please provide a valid email");
        }

        mutate({ email })

    };
    return { getUserEmailAddress, isPending, handleSubmitForgotPasswordForm }
}