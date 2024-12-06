// Import statements and type definitions
import { Message } from "@/src/types/general";
import { useState, useRef, useEffect, useCallback } from "react";
import { useApiPost, useGetData, useGetUser, UserType } from "../serviceHook";
import { GENERAL_API_END_POINTS, SOCKET_SERVER } from "@/app/lib/constant";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { EmojiClickData } from "emoji-picker-react";

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
    const { handleSendingMessage, status, lastMessage, joinChatRoom, messages, setMessages } = useSendMessages(currentRoom as string);
    const [showMobileChat, setShowMobileChat] = useState(false);
    const [chatRoomId, setChatRoomId] = useState(currentRoom)
    const { data: userData } = useGetUser();

    const currentUser = userData?.data.user.user_id;
    // State for emoji
    // const [emoji, setEmoji] = useState(""); // Corrected spelling of setEmoji

    // Emoji click handler
    const onEmojiClick = (emojiData: EmojiClickData) => {

        setMessage(currentMessage => currentMessage + emojiData.emoji);
        // setEmoji("");
    };



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
        if (!message.trim() || !receiverID || !currentRoom || !currentUser) return;

        // Only send the message, don't update state here
        handleSendingMessage(message, receiverID, currentRoom as string);
        setMessage("");

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [message, receiverID, currentRoom, currentUser, handleSendingMessage]);

    return {
        adjustTextareaHeight,
        setMessage,
        message,
        status,
        textareaRef,
        onEmojiClick,
        handleSendMessage,
        selectedChat,
        showMobileChat,
        lastMessage,
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
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.GET_CHAT_ROOM_ID);
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
 * 
 */
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
export const useSendMessages = (roomId: string) => {
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.SEND_MESSAGE, 'messages');
    const [status, setStatus] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const { data: userData } = useGetUser();
    const lastMessageEndpoint = `${GENERAL_API_END_POINTS.GET_LAST_SENT_MESSAGE}`
    const { data: lastMessageContent, error } = useGetData<LastMessageSent>(lastMessageEndpoint, 'message')
    const [lastMessage, setLastMessage] = useState<LastMessageSentType[]>([]);
    const currentUser = userData?.data.user.user_id;
    const socketRef = useRef<Socket | null>(null);

    const joinChatRoom = useCallback((roomId: string) => {
        if (socketRef.current && roomId) {
            console.log('Joining room:', roomId);
            socketRef.current.emit('join_room', roomId);
        }

    }, []);

    useEffect(() => {
        if (lastMessageContent?.data?.messages) {
            console.log(lastMessageContent.data.messages)
            setLastMessage(lastMessageContent.data.messages);
        }
        if (error && axios.isAxiosError(error)) {
            console.log("Error fetching last message messages", error.response?.data);
        }
    }, [lastMessageContent, error]);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER);
        socketRef.current = newSocket;

        newSocket.on('connect', () => {
            console.log('Socket connected');
        });

        newSocket.on("status_change", (data) => {
            setStatus(data.status)
        })

        newSocket.on('new_message', (data: Message) => {
            if (data.sender_id !== currentUser) {
                setMessages(prev => [...prev, data]);
            }
        });
        newSocket.on('last_message', (data) => {
            setLastMessage(prev => {
                const otherMessages = prev.filter(msg =>
                    (msg.sender_id !== data.sender_id || msg.receiver_id !== data.receiver_id) &&
                    (msg.sender_id !== data.receiver_id || msg.receiver_id !== data.sender_id)
                );
                return [...otherMessages, data];
            });
        });

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
        };
    }, [currentUser, status]);

    const handleSendingMessage = async (message: string, receiver_id: string, chatRoomId: string) => {
        if (!message.trim() || !receiver_id || !chatRoomId || !currentUser) return;

        joinChatRoom(chatRoomId);

        const newMessage = {
            content: message.trim(),
            receiver_id,
            sender_id: currentUser,
            chatRoomId,
            timestamp: new Date(),
            isRead: false
        };

        setMessages(prev => [...prev, newMessage]);

        mutate(newMessage, {
            onSuccess: (result) => {
                console.log('Message sent successfully:', result);
            },
            onError: (error) => {
                console.error('Error sending message:', error);
                setMessages(prev => prev.filter(msg =>
                    msg.timestamp !== newMessage.timestamp
                ));
            }
        });
    };

    return { handleSendingMessage, status, lastMessage, joinChatRoom, messages, setMessages };
};

/**
 * Hook for fetching all messages for a chat room
 */
const useGetAllMessages = (chatRoomId: string) => {
    const getAlMessagesEndPoint = `${GENERAL_API_END_POINTS.GET_ALL_MESSAGES}/${chatRoomId}`;
    const { data, error } = useGetData<MessagesApiResponse>(getAlMessagesEndPoint, 'messages');
    if (error && axios.isAxiosError(error)) {
        console.log("Error fecting messages", error.response?.data);
    }

    return { data };


};