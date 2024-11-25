import { useAppDispatch } from "@/app/lib/hooks";
import { closeModal } from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";
import { api } from "@/app/lib/service/fetchData"
import { ApiResponse } from "@/app/lib/types";
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
export interface UserType {
    // Personal & Professional Info
    name: string;
    email: string;
    phone_number: string;
    about: string;
    medical_license: string;
    profile_photo: string;
    years_of_experience: string;
    languages: string;
    speciality: string;
    // Location/Practice Info
    hospital_name: string;
    hospital_address: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    working_days: string;
}
export interface User {
    data: {
        user: UserType
    }
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
export const useUpdateData = <TData, TVariables>(apiEndpoint: string, queryKey?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TVariables) => {

            return api.put<ApiResponse<TData>>(apiEndpoint, data);
        },
        onSuccess: (result) => {
            if (result) {
                console.log("Updated data", result.data)
                toast.success(result.data.message)
            }
            queryClient.invalidateQueries({ queryKey: [queryKey] })

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

export const useGetData = <TData>(apiEndpoint: string, queryKeyType: string):
    UseQueryResult<TData, Error> => {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: [queryKeyType],
        queryFn: async () => {
            const { data } = await api.get<TData>(apiEndpoint);
            return data;
        },
    });
};

// useDeleteData.ts
export const useDeleteData = <TData>(apiEndpoint: string, queryKey: string) => {
    const queryClient = useQueryClient();
    const disPatch = useAppDispatch();

    return useMutation({
        mutationFn: (id: number) => {
            return api.delete<ApiResponse<TData>>(`${apiEndpoint}/${id}`);
        },

        onSuccess: (result) => {
            if (result) {
                toast.success(result.data.message);
            }
            queryClient.invalidateQueries({ queryKey: [queryKey] })
            disPatch(closeModal());
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something went wrong");
            }
        }
    });
};






