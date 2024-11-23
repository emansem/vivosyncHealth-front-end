import { api } from "@/app/lib/service/fetchData"
import { ApiResponse } from "@/app/lib/types";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
export interface User {
    isEmailVerified: boolean,

    user_type: string,
    isProfileCompleted: boolean,
    TokenExpireTime: number
    email: string,

}
//A reusable custom hook to post data to the server
export const useApiPost = <TData, TVariables>(apiEndpoint: string) => {
    return useMutation({

        mutationFn: (data: TVariables) => {
            return api.post<ApiResponse<TData>>(apiEndpoint, data)
        },

        onSuccess: (result) => {
            const { message, jwt } = result.data;
            console.log('Succesfull sent data to the server:', result.data);
            toast.success(message);
            if (jwt) {
                localStorage.setItem('jwt', JSON.stringify(jwt));
            }
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("error saving user details", error)
                const errorMessage = error.response?.data.message

                toast.error(errorMessage || "Something went wrong,please try again")
            }


        }
    })
}

//A reusable custom hook to update data on the server
export const useUpdateData = <TData, TVariables>(apiEndpoint: string) => {
    return useMutation({
        mutationFn: (data: TVariables) => {
            console.log('updated data',)
            return api.put<ApiResponse<TData>>(apiEndpoint, data);
        },
        onSuccess: (result) => {
            if (result) {
                toast.success(result.data.message)
            }

        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong,please try again");

            }
        }
    })


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

