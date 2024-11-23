"use client"

import { useEffect, useState } from "react";
import { useUpdateData } from "../serviceHook";
import { TokenType } from "@/app/lib/types";
import { decordValue, encodeValue } from "@/src/helper/decordAndEncord";



export const useResendLink = (subject: string) => {
    const RESEND_DELAY = 2 * 60 * 1000; // 2 minutes in milliseconds
    const apiEndpoint = '/auth/resend-link';
    const { mutate } = useUpdateData(apiEndpoint);

    // Track button disabled state and countdown timer
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [tokenCode, setTokenCode] = useState('')
    const [emailAddress, setEmailAddress] = useState('')


    // Initialize timer from localStorage on component mount
    useEffect(() => {
        const storedTime = localStorage.getItem('nextResendTime');
        if (storedTime) {
            const nextResendTime = parseInt(JSON.parse(storedTime));
            const remaining = nextResendTime - Date.now();

            // If there's remaining time, start the countdown
            if (remaining > 0) {
                setTimeLeft(remaining);
                setIsDisabled(true);  // Also disable the button
            }
        }
    }, []);

    // Handle countdown timer
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1000;
                    if (newTime <= 0) {
                        setIsDisabled(false);  // Enable button when timer ends
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }

        // Cleanup timer on unmount or when timeLeft changes
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleResendEmail = () => {
        // Don't proceed if already disabled
        if (isDisabled) return;

        // Get email from localStorage
        const encodedEmailAddress = localStorage.getItem('email_verify_failed');
        const encodeResetPasswordToken = localStorage.getItem('remember_token')
        // Don't proceed without email
        console.log(encodedEmailAddress)
        if (encodedEmailAddress) {
            const decodeemailAddress = decordValue(encodedEmailAddress);

            setEmailAddress(decodeemailAddress as string)
        } else if (encodeResetPasswordToken) {
            const decordResetPasswordToken = decordValue(encodeResetPasswordToken as string) as string
            setTokenCode(decordResetPasswordToken)

        } else {
            return
        }


        // Set next resend time in localStorage
        const nextResendTime = Date.now() + RESEND_DELAY;
        localStorage.setItem('nextResendTime', JSON.stringify(nextResendTime));

        // Update UI state
        setIsDisabled(true);
        setTimeLeft(RESEND_DELAY);


        const token: TokenType = {
            email: emailAddress,
            token: tokenCode,
            subject,
        };

        // Send API request
        mutate(token, {
            onSuccess: (result) => {
                const { token } = result.data
                localStorage.setItem("remember_token", encodeValue(token as string))
                // setIsDisabled(false)
            },
            onError: () => {
                // On error, re-enable the button immediately
                setIsDisabled(false);
                setTimeLeft(0);
                localStorage.removeItem('nextResendTime');
            }
        });
    };

    return {
        handleResendEmail,
        isDisabled,
        timeLeft: Math.ceil(timeLeft / 1000)  // Convert to seconds for UI
    };
};