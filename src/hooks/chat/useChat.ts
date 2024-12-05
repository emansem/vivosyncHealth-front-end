// Import statements and type definitions
import { demoChats, generateDemoMessages } from "@/data/chatData";
import { Chat, Message } from "@/src/types/general";
import { useState, useRef, useEffect, useCallback } from "react";
import { useApiPost, useGetData, UserType } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import axios from "axios";
import { io, Socket } from "socket.io-client";

// Type definitions for API responses
interface SubscriptionDataApiResponse {
    data: {
        users: UserType[];
    };
}

interface MessagesApiResponse {
    data: {
        messages: Message[];
    };
}

// Constants
const SOCKET_SERVER = 'http://localhost:5740/';

/**
 * Hook to fetch active subscriptions
 * Returns list of active users and loading state
 */
export const useGetActiveSubscription = () => {
    const { data, error, isLoading } = useGetData<SubscriptionDataApiResponse>(
        GENERAL_API_END_POINTS.GET_ACTIVE_SUBSCRIPTION,
        'activeSubscription'
    );

    // Proper error handling with type checking
    if (error && axios.isAxiosError(error)) {
        console.error("Error fetching subscription data:", error.response?.data);
    }

    return { activeUsers: data?.data?.users, isLoading };
};

/**
 * Main hook for message sending functionality
 * Manages message state, chat selection, and UI interactions
 */
export const useSendingMessage = () => {
    // State declarations
    const { activeUsers, isLoading } = useGetActiveSubscription();
    const { handleGetReceiverId, currentRoom } = useChatRoom();
    const [receiverID, setReceiverID] = useState("");
    const [message, setMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState<UserType | null>(null);
    const { handleSendingMessage, joinChatRoom, messages, setMessages } = useSendMessages();
    const [showMobileChat, setShowMobileChat] = useState(false);
    const [chatRoomId, setChatRoomId] = useState(currentRoom)

    // Refs for DOM manipulation
    const messageEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Fetch messages for current room
    const { data } = useGetAllMessages(chatRoomId as string);

    // Auto-scroll to bottom of messages
    const scrollToBottom = useCallback(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // Effect hooks for various functionalities
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (selectedChat && data?.data.messages) {
            setMessages(data.data.messages);
        }
    }, [selectedChat, data?.data.messages, setMessages]);

    // Join chat room when room changes
    useEffect(() => {
        if (currentRoom) {
            joinChatRoom(currentRoom as string);
            setChatRoomId(currentRoom)
        }
    }, [currentRoom, joinChatRoom]);

    // Select first user when active users load
    useEffect(() => {
        if (activeUsers && activeUsers?.length > 0) {
            // setSelectedChat(activeUsers[0]);
            setReceiverID(activeUsers[0].user_id);
            setChatRoomId(currentRoom)
        }
    }, [activeUsers, currentRoom]);

    // Textarea height adjustment function
    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    // Chat selection handler
    const handleSetSelectChat = useCallback((user: UserType | null) => {
        if (!user) return;

        setSelectedChat(user);
        setShowMobileChat(true);
        handleGetReceiverId(user.user_id);
        setReceiverID(user.user_id);

    }, [handleGetReceiverId]);

    // Message sending handler
    const handleSendMessage = useCallback(() => {
        if (!message.trim() || !receiverID || !currentRoom) return;

        const newMessage: Message = {
            receiver_id: receiverID,
            content: message.trim(),
            sender_id: "current-user",
            timestamp: new Date(),
            isRead: false
        };

        setMessages(prev => [...prev, newMessage]);
        handleSendingMessage(message, receiverID, currentRoom as string);
        setMessage("");

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [message, receiverID, currentRoom, handleSendingMessage]);

    return {
        adjustTextareaHeight,
        setMessage,
        message,
        textareaRef,
        handleSendMessage,
        selectedChat,
        showMobileChat,
        setShowMobileChat,
        handleSetSelectChat,
        activeUsers,
        isLoading,
        messageEndRef,
        messages
    };
};

/**
 * Hook for managing chat room functionality
 * Handles room creation and socket connections
 */
const useChatRoom = () => {
    const { mutate, data } = useApiPost(GENERAL_API_END_POINTS.GET_CHAT_ROOM_ID);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentRoom, setCurrentRoom] = useState<number | string | null>(null);

    // Initialize socket connection
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER);
        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    // Handler for getting receiver ID and joining room
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

/**
 * Hook for managing message sending and receiving
 * Handles socket connections and message state
 */
const useSendMessages = () => {
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.SEND_MESSAGE, 'messages');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    // Join chat room function
    const joinChatRoom = useCallback((roomId: string) => {
        if (socket && roomId) {
            console.log('Joining room:', roomId);
            socket.emit('join_room', roomId);
        }
    }, [socket]);

    // Socket connection and message listener
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER);

        newSocket.on('connect', () => {
            console.log('Socket connected');
            setSocket(newSocket);
        });

        newSocket.on('new_message', (data: Message) => {
            console.log('Received new message:', data);
            setMessages(prev => [...prev, data]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    // Message sending handler
    const handleSendingMessage = async (message: string, receiver_id: string, chatRoomId: string) => {
        if (!message.trim() || !receiver_id || !chatRoomId) return;

        joinChatRoom(chatRoomId);

        const newMessage = {
            content: message.trim(),
            receiver_id,
            chatRoomId,
            timeStamp: new Date()
        };

        mutate(newMessage, {
            onSuccess: (result) => {
                console.log('Message sent successfully:', result);
            },
            onError: (error) => {
                console.error('Error sending message:', error);
            }
        });
    };

    return { handleSendingMessage, joinChatRoom, messages, setMessages };
};

/**
 * Hook for fetching all messages for a chat room
 */
const useGetAllMessages = (chatRoomId: string) => {
    const getAlMessagesEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_MESSAGES}/${chatRoomId}`;
    const { data, isLoading, error } = useGetData<MessagesApiResponse>(getAlMessagesEndPoint, 'messages');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fecting messages", error.response?.data);
    }
    console.log("Messages", data?.data.messages)

    return { data };
};