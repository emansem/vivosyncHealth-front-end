import { DoctorOnboardingForm } from "@/app/lib/redux/features/form/multipleStepFormSlice";
import { api } from "@/app/lib/service/fetchData"
import { ApiResponse } from "@/app/lib/types";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

//A reusable custom hook to handle all post methods
export const useApiPost = <TData, TVariables>(apiEndpoint: string) => {
    return useMutation({

        mutationFn: (data: TVariables) => {
            return api.post<ApiResponse<TData>>(apiEndpoint, data)
        },

        onSuccess: (result) => {
            const { message, jwt } = result.data;
            console.log('Registration successful:', result.data);
            toast.success(message);
            if (jwt) {
                localStorage.setItem('jwt', jwt);
            }
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("error saving user details", error)
                const errorMessage = error.response?.data.message

                toast.error(errorMessage)
            }


        }
    })
}

export const useUpdateData = (apiEndpoint: string) => {
    const updateUser = useMutation({
        mutationFn: (updatingData: string) => {
            console.log('updated data', updatingData)
            return api.put(apiEndpoint, { updatingData });
        },
        onSuccess: (data) => {
            if (data) {
                console.log("Success updating data", data.data);
            }

        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);

            }
        }
    })
    return { updateUser }

}
interface User {
    isEmailVerified: boolean,
    user_type: string,
    isProfileCompleted: boolean,
    TokenExpireTime: number

}

export const useGetUser = (): UseQueryResult<User, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await api.get<User>('/user');
            return data;
        },
    });
};

export const useUpdatedOnboardingData = (apiEndpoint: string) => {
    const updateOnboardData = useMutation({
        mutationFn: (updatingData: DoctorOnboardingForm) => {

            return api.put(apiEndpoint, updatingData);
        },
        onSuccess: (data) => {
            if (data) {
                console.log("Success updating data", data.data);
            }

        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("Error updating doctorData", error.response?.data)
                toast.error(error.response?.data.message);
            }
        }
    })
    return { updateOnboardData }
}
export const useVerifyPasswordRestToken = () => {
    const [hasTokenExpired, setHasTokenExpired] = useState(false);
    const verifyToken = useMutation({
        mutationFn: (token: string) => {
            console.log('updated data', token)
            return api.post("/auth/verify-password-token", { token });
        },
        onSuccess: (data) => {
            if (data) {
                console.log("success verifying email", data.data);
            }

        },
        onError: (error) => {

            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data.message as string
                toast.error(errorMessage);
                console.log('error', error.response?.data)

                if (errorMessage.includes('Token has expired')) {
                    setHasTokenExpired(true)
                }

            }
        }
    })
    return { verifyToken, hasTokenExpired }
}