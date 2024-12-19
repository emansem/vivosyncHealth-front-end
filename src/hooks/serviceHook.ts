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
    rating: number,
    num_reviews: number,
    balance?: number,
    user_type?: string,
    user_id: string,
    // Location/Practice Info
    hospital_name: string;
    hospital_address: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    gender?: "male" | "female" | 'custom' | '' | undefined
    date_of_birth?: string
    status?: string,
    working_days: string;
    created_at?: Date | number | string,
    upadted_at?: Date | number | string
}
export interface User {
    data: {
        user: UserType
    }
}
//A reusable custom hook to post data to the server
export const useApiPost = <TData, TVariables>(apiEndpoint: string, queryKey?: string) => {
    const queryClient = useQueryClient();
    return useMutation({

        mutationFn: (data: TVariables) => {
            return api.post<ApiResponse<TData>>(apiEndpoint, data)
        },

        onSuccess: (result) => {
            const { jwt } = result.data;
            // console.log('Succesfull sent data to the server:', result.data);
            if (jwt) {
                localStorage.setItem('jwt', JSON.stringify(jwt));
            }

            queryClient.invalidateQueries({ queryKey: [queryKey] })
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("error saving user details", error.response?.data)
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

export const useGetData = <TData>(apiEndpoint: string, queryKeyType: string): UseQueryResult<TData, Error> => {
    // We'll extract any query parameters from the API endpoint
    const queryParams = apiEndpoint.split('?')[1];

    // Create a more specific query key that includes both the type and any parameters
    const fullQueryKey = queryParams
        ? [queryKeyType, queryParams]  // If there are query params, include them in the key
        : [queryKeyType];              // If no params, just use the type

    return useQuery({
        queryKey: fullQueryKey,
        queryFn: async () => {
            const { data } = await api.get<TData>(apiEndpoint);
            return data;
        },

        staleTime: 30000, // Consider data fresh for 30 seconds


        // Prevent unnecessary background refetches
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
};


// useDeleteData.ts
export const useDeleteData = <TData>(apiEndpoint: string, queryKey: string) => {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({ queryKey: [queryKey] })
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






