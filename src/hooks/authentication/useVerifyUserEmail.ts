import { TokenType } from "@/app/lib/types";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { useGetUser, useUpdateData } from "../serviceHook";

//Verify user email in 5 steps haha
export const useVerifyEmail = (token: TokenType) => {
    const [noUser, setNoUser] = useState(false)
    const [hasTokenExpired, setHasTokenExpired] = useState(false);
    const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);
    const endPoint = "/auth/verify-email";
    const { data: user, isLoading, error } = useGetUser();
    const { mutate } = useUpdateData(endPoint);


    // Handle user fetch errors
    useEffect(() => {
        if (error && axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
            const errorMessage = error.response?.data.message as string;
            if (errorMessage.includes("User not found")) {
                setNoUser(true)
            }
        }
    }, [error]);

    const user_type = user?.user_type;

    //handle email verification
    const verifyEmail = useCallback(() => {
        const isEmailVerified = user?.isEmailVerified;

        if (!isEmailVerified && user && token) {
            const isTokenExpired = user.TokenExpireTime < Date.now();
            if (!isTokenExpired) {
                mutate(token, {
                    onError: () => {
                        setIsUserEmailVerified(false);
                    }
                })
            } else {

                setHasTokenExpired(true);
            }
        } else {
            setIsUserEmailVerified(true);
        }

    }, [user, token, mutate]);

    useEffect(() => {
        verifyEmail();
    }, [verifyEmail]);

    return { isLoading, user_type, hasTokenExpired, noUser, isUserEmailVerified };
};