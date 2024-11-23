'use client'

import { TokenType } from "@/app/lib/types";
import { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useGetUser, useUpdateData } from "../serviceHook";
import { EMAIL_SUBJECT, USER_TYPES } from "@/app/lib/constant";
import axios from "axios";
import { encodeValue } from "@/src/helper/decordAndEncord";

export const useVerifyEmail = (subject: string) => {
    const endPoint = "/auth/verify-email";
    const { mutate, isPending } = useUpdateData(endPoint);
    const [codes, setCodes] = useState(["", "", "", "", ""]);
    const [jwt, setJwt] = useState<string>("");
    const [isloading, setIsloading] = useState(true)

    // Move localStorage to useEffect to ensure client-side execution
    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt")
        if (jwt || storedJwt) {
            setIsloading(false)
            setJwt(storedJwt as string);
            return
        }
        window.location.href = "/"
        return
    }, [jwt]);

    // useEffect(() => {
    //     const remember_token = localStorage.getItem('remember_token')
    //     const password_rest_token = localStorage.getItem('email_verify_failed')

    // }, [])

    const handleCodeOnchange = (
        e: ChangeEvent<HTMLInputElement>,
        targetIndex: number
    ) => {
        let value = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        setCodes((prev) =>
            prev.map((code, index) => (index === targetIndex ? value : code))
        );

        if (value && targetIndex < 4) {
            const nextInput = document.querySelector(
                `input[name="code-${targetIndex + 1}"]`
            );
            (nextInput as HTMLInputElement)?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        targetIndex: number
    ) => {
        if (e.key === "Backspace") {
            if (!codes[targetIndex] && targetIndex > 0) {
                setCodes((prev) =>
                    prev.map((code, index) => (index === targetIndex - 1 ? "" : code))
                );
                const prevInput = document.querySelector(
                    `input[name="code-${targetIndex - 1}"]`
                ) as HTMLInputElement;
                prevInput?.focus();
            } else {
                setCodes((prev) =>
                    prev.map((code, index) => (index === targetIndex ? "" : code))
                );
            }
        }
    };

    const submitVerificationCode = () => {
        const verificationCode: TokenType = {
            token: codes.join(""),
            subject
        };


        if (verificationCode.token && verificationCode.token?.length >= 5) {
            mutate(verificationCode, {
                onSuccess: (response) => {
                    console.log(response.data)
                    const { jwt, user_type, email_subject, token } = response.data;
                    localStorage.setItem('jwt', JSON.stringify(jwt));
                    setJwt(JSON.stringify(jwt));
                    if (email_subject === EMAIL_SUBJECT.VERIFY_EMAIL && USER_TYPES.DOCTOR === user_type) {
                        localStorage.removeItem('nextResendTime');
                        localStorage.removeItem('remember_token')
                        localStorage.removeItem('email_verify_failed')
                        setTimeout(() => window.location.href = "/onboard/doctor", 400);
                        return
                    } else if (EMAIL_SUBJECT.RESET_PASSWORD === email_subject) {

                        setTimeout(() => window.location.href = "/reset-password", 400);
                    }
                },
                onError: (error) => {
                    if (axios.isAxiosError(error)) {
                        const { email } = error.response?.data
                        email ? localStorage.setItem('email_verify_failed', encodeValue(email)) : ''

                    }
                }
            });
            return;
        }
        toast.error("Please enter a valid code");
    };

    return {
        handleCodeOnchange,
        handleKeyDown,
        submitVerificationCode,
        isPending,
        codes,
        jwt,
        isloading
    };
};