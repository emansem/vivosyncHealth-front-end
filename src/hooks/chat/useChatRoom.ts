import { GENERAL_API_END_POINTS, SOCKET_SERVER } from "@/app/lib/constant";
import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useApiPost } from "../serviceHook";

/**
 * Manages chat room creation and real-time connections between users.
 * Coordinates REST API for room creation and WebSocket for live communication.
 */
export const useChatRoom = () => {
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.GET_CHAT_ROOM_ID);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentRoom, setCurrentRoom] = useState<number | string | null>(null);

    // Initialize WebSocket connection with cleanup on unmount
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER);
        setSocket(newSocket);
        return () => {
            newSocket.close();
        };
    }, []);

    // Creates or retrieves a chat room for two users and joins it
    const handleGetReceiverId = useCallback((receiverId: string) => {
        if (!receiverId || !socket) return;

        mutate({ receiverId }, {
            onSuccess: (result) => {
                const { chatRoomId } = result.data;
                socket.emit('join_room', chatRoomId);
                setCurrentRoom(chatRoomId as string);
            }
        });
    }, [socket, mutate]);

    return { handleGetReceiverId, currentRoom };
};