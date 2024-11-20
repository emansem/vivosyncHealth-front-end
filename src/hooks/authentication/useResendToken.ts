"use client"

import { useState } from "react";
import { useUpdateData } from "../serviceHook";
import { TokenType } from "@/app/lib/types";
import toast from "react-hot-toast";

export const useResendLink = (token: TokenType) => {

    const apiEndpoint = '/auth/resend-link'
    const { mutate } = useUpdateData(apiEndpoint,)
    const [isDisabled, setIsDisabled] = useState(false);  // Track button disabled state

    const handleResendEmail = () => {
        // Disable the button
        setIsDisabled(true);

        // Send the request
        if (!token) return
        mutate(token, {
            onSuccess: (result) => {
                const { message } = result.data
                toast.success(message)

                setTimeout(() => {
                    setIsDisabled(false);
                }, 60000);
            },
            onError: () => {
                setIsDisabled(false);
            }
        });
    };

    return { handleResendEmail, isDisabled };

}