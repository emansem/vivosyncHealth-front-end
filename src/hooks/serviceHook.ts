import { DoctorOnboardingForm } from "@/app/lib/redux/features/form/multipleStepFormSlice";
import { api } from "@/app/lib/service/fetchData"
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";


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

export const useupdatedOnboardingData = (apiEndpoint: string) => {
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