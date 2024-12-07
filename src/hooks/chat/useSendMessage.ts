import { GENERAL_API_END_POINTS, SOCKET_SERVER } from "@/app/lib/constant";
import axios from "axios";
import { useState, useRef, useCallback, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useApiPost, useGetUser, useGetData } from "../serviceHook";
import { Message } from "@/src/types/general";

/**
 * Custom hook for managing real-time messaging functionality using WebSockets
 * 
 * This hook implements a hybrid messaging system that combines REST APIs for persistence
 * with WebSockets for real-time communication. This architecture provides:
 * - Reliable message delivery through REST API persistence
 * - Instant message updates through WebSocket events
 * - Message status tracking and synchronization
 * - Chat room management for multi-user conversations
 * 
 * The hook maintains message state locally while ensuring consistency with the server
 * through optimistic updates and rollback on failure.
 */

// Type definitions for last message tracking
type LastMessageSentType = {
    receiver_id: string,
    sender_id: string,
    content: string,
}

interface LastMessageSent {
    data: {
        messages: LastMessageSentType[]
    }
}

export const useSendMessages = () => {
    // API mutation hook for sending messages with persistent storage
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.SEND_MESSAGE, 'messages');

    // State management for message status and history
    const [status, setStatus] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [lastMessage, setLastMessage] = useState<LastMessageSentType[]>([]);

    // User authentication and identification
    const { data: userData } = useGetUser();
    const currentUser = userData?.data.user.user_id;

    // Fetch last messages for conversation continuity
    const lastMessageEndpoint = `${GENERAL_API_END_POINTS.GET_LAST_SENT_MESSAGE}`
    const { data: lastMessageContent, error } = useGetData<LastMessageSent>(lastMessageEndpoint, 'message')

    /**
     * WebSocket connection management using useRef
     * We use useRef instead of useState to:
     * 1. Maintain a stable reference across re-renders
     * 2. Allow access to the socket instance in event callbacks
     * 3. Prevent unnecessary re-renders when the socket connection updates
     */
    const socketRef = useRef<Socket | null>(null);

    /**
     * Chat room joining handler
     * Implements the room-based message routing pattern for targeted message delivery
     * This prevents unnecessary message broadcasting to all connected clients
     */
    const joinChatRoom = useCallback((roomId: string) => {
        if (socketRef.current && roomId) {
            console.log('Joining room:', roomId);
            socketRef.current.emit('join_room', roomId);
        }
    }, []);

    /**
     * Effect hook for last message synchronization
     * Updates local state when new messages are fetched from the server
     * Implements error handling for failed message fetches
     */
    useEffect(() => {
        if (lastMessageContent?.data?.messages) {
            console.log(lastMessageContent.data.messages)
            setLastMessage(lastMessageContent.data.messages);
        }
        if (error && axios.isAxiosError(error)) {
            console.log("Error fetching last message messages", error.response?.data);
        }
    }, [lastMessageContent, error]);

    /**
     * Main WebSocket connection and event handling setup
     * This effect manages the complete lifecycle of the WebSocket connection:
     * 1. Establishes initial connection
     * 2. Sets up event listeners for various message types
     * 3. Handles cleanup on component unmount
     * 
     * The effect uses the currentUser dependency to ensure proper message filtering
     * and prevent duplicate messages in the UI.
     */
    useEffect(() => {
        // Create new socket connection
        const newSocket = io(SOCKET_SERVER);
        socketRef.current = newSocket;

        // Connection status handling
        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        // Status change event handler
        newSocket.on("status_change", (data) => {
            setStatus(data.status)
        })

        /**
         * New message event handler
         * Filters out self-sent messages to prevent duplicates
         * This is necessary because the sender already optimistically adds their own messages
         */
        newSocket.on('new_message', (data: Message) => {
            if (data.sender_id !== currentUser) {
                setMessages(prev => [...prev, data]);
            }
        });

        /**
         * Last message update handler
         * Implements a sophisticated message deduplication strategy:
         * 1. Filters out existing messages between the same users
         * 2. Maintains conversation history for different user pairs
         * 3. Adds new messages in chronological order
         */
        newSocket.on('last_message', (data) => {
            setLastMessage(prev => {
                const otherMessages = prev.filter(msg =>
                    (msg.sender_id !== data.sender_id || msg.receiver_id !== data.receiver_id) &&
                    (msg.sender_id !== data.receiver_id || msg.receiver_id !== data.sender_id)
                );
                return [...otherMessages, data];
            });
        });

        // Cleanup function for WebSocket disconnection
        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [currentUser, status]);

    /**
     * Message sending handler with optimistic updates
     * Implements a robust message sending strategy:
     * 1. Validates input parameters
     * 2. Updates local state optimistically
     * 3. Persists message through REST API
     * 4. Rolls back on failure
     * 
     * This approach provides instant UI feedback while ensuring data consistency
     * @param message - The message content to send
     * @param receiver_id - The recipient's user ID
     * @param chatRoomId - The ID of the chat room for message routing
     */
    const handleSendingMessage = async (message: string, receiver_id: string, chatRoomId: string) => {
        // Input validation
        if (!message.trim() || !receiver_id || !chatRoomId || !currentUser) return;

        // Ensure sender is in the correct chat room
        joinChatRoom(chatRoomId);

        // Create new message object with metadata
        const newMessage = {
            content: message.trim(),
            receiver_id,
            sender_id: currentUser,
            chatRoomId,
            timestamp: new Date(),
            isRead: false
        };

        // Optimistic update
        setMessages(prev => [...prev, newMessage]);

        // Persist message with error handling
        mutate(newMessage, {
            onSuccess: (result) => {
                console.log('Message sent successfully:', result);
            },
            onError: (error) => {
                console.error('Error sending message:', error);
                // Rollback optimistic update on failure
                setMessages(prev => prev.filter(msg =>
                    msg.timestamp !== newMessage.timestamp
                ));
            }
        });
    };

    // Expose necessary functions and state for component use
    return { handleSendingMessage, status, lastMessage, joinChatRoom, messages, setMessages };
};