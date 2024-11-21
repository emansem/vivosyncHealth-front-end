'use client'
import { TokenType } from "@/app/lib/types";
import { useUpdateData } from "../serviceHook";
import axios from "axios";
import { useState, useEffect } from "react";
import { useResendLink } from "./useResendToken";

export const useVerifyPasswordRestToken = (tokenData: TokenType) => {
    const { token } = tokenData
    console.log(token)
    const [hasTokenExpired, setHasTokenExpired] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const { mutate, isPending } = useUpdateData("/auth/verify-password-token")
    const { handleResendEmail } = useResendLink('RESET_PASSWORD');

    useEffect(() => {
        // Only proceed if token exists
        if (!token) return;

        mutate(tokenData, {
            onSuccess: () => {
                setIsVerified(true);

                window.location.href = `http://localhost:3000/auth/reset-password-reset?token=${token}`;
            },

            onError: (error) => {
                setIsVerified(true);

                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data.message as string
                    if (errorMessage.includes('Token has expired') || errorMessage.includes("Invalid token")) {
                        setHasTokenExpired(true)
                    }

                }
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mutate])


    return { hasTokenExpired, isVerified, handleResendEmail, isPending }
}