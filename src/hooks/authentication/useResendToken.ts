"use client"

import { useState } from "react";
import { useGetUser, useUpdateData } from "../serviceHook";
import toast from "react-hot-toast";

export const useResendLink = () => {

    const apiEndpoint = '/auth/resend-link'
    const { mutate } = useUpdateData(apiEndpoint,)
    const [isDisabled, setIsDisabled] = useState(false);  // Track button disabled state
    const { data } = useGetUser()

    const handleResendEmail = () => {
        const email = data?.email as string
        if (!email) return toast.error("User account not found, please create an account")
        const token = {
            email: email
        }
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