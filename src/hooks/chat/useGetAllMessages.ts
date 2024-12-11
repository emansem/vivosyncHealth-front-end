/**
 * Hook for fetching all messages for a chat room
 */

import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import { Message } from "@/src/types/general";
import axios from "axios";
import { useGetData } from "../serviceHook";

interface MessagesApiResponse {
    data: {
        messages: Message[];
    };
}
export const useGetAllMessages = (chatRoomId: string) => {
    const getAlMessagesEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_MESSAGES}/${chatRoomId}`;
    const { data, error } = useGetData<MessagesApiResponse>(getAlMessagesEndPoint, 'messages');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fecting messages", error.response?.data);
    }

    return { data };


};