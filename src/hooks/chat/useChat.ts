import { demoChats, generateDemoMessages } from "@/data/chatData";
import { Chat, Message } from "@/src/types/general";
import { useState, useRef, useEffect } from "react";
import { useApiPost, useGetData, UserType } from "../serviceHook";
import { GENERAL_API_END_POINTS } from "@/app/lib/constant";
import axios from "axios";
import { io, Socket } from "socket.io-client"
interface SubscriptionDataApiResponse {
    data: {
        users: UserType[]
    }
}
// const socket = io('http://localhost:5740/');
const SOCKET_SERVER = 'http://localhost:5740/';

export const useGetActiveSubscription = () => {
    const { data, error, isLoading } = useGetData<SubscriptionDataApiResponse>(GENERAL_API_END_POINTS.GET_ACTIVE_SUBSCRIPTION, 'activeSubscription')
    if (error && axios.isAxiosError(error)) {
        console.log("Error fetching user data", error.response?.data)
    }

    return { activeUsers: data?.data?.users, isLoading }
}


export const useSendingMessage = () => {
    const { activeUsers, isLoading } = useGetActiveSubscription()
    const { handleGetReceiverId, currentRoom } = useChatRoom()
    const [selectedChat, setSelectedChat] = useState<UserType | null>(null);
    const [receiverID, setReceiverID] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(
        generateDemoMessages(demoChats[0].id)
    );
    const { handleSendingMessage } = useSendMessages()
    const [showMobileChat, setShowMobileChat] = useState(false);
    const messageEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (selectedChat) {
            setMessages(generateDemoMessages(selectedChat.user_id));
        }
    }, [selectedChat]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };
    // Update selectedChat when activeUsers loads
    useEffect(() => {

        if (activeUsers && activeUsers.length > 0) {
            setSelectedChat(activeUsers[0]);
            setReceiverID(activeUsers[0].user_id)

        }
    }, []);

    const handleSetSelectChat = (user: UserType | null) => {
        setSelectedChat(user)
        setShowMobileChat(true);
        handleGetReceiverId(user?.user_id as string)
        setReceiverID(user?.user_id as string)

    }



    const handleSendMessage = () => {
        if (!message.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: message,
            senderId: "current-user",
            timestamp: new Date(),
            isRead: false
        };

        setMessages([...messages, newMessage]);
        handleSendingMessage(message, receiverID, currentRoom as string)
        setMessage("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    return { adjustTextareaHeight, setMessage, message, textareaRef, handleSendMessage, selectedChat, showMobileChat, setShowMobileChat, handleSetSelectChat, demoChats, activeUsers, isLoading, messageEndRef, messages }
}

const useChatRoom = () => {
    const { mutate, data } = useApiPost(GENERAL_API_END_POINTS.GET_CHAT_ROOM_ID)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [currentRoom, setCurrentRoom] = useState<number | string | null>(null)
    useEffect(() => {
        // Create socket connection
        const newSocket = io(SOCKET_SERVER)
        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [])

    const handleGetReceiverId = (receiverId: string) => {
        if (receiverId || !socket) {
            mutate({ receiverId }, {
                onSuccess: (result) => {
                    const { chatRoomId } = result.data
                    socket?.emit('join_room', chatRoomId);
                    setCurrentRoom(chatRoomId as string)
                }
            })
        }

    }
    return { handleGetReceiverId, currentRoom }
}

const useSendMessages = () => {
    const { mutate } = useApiPost(GENERAL_API_END_POINTS.SEND_MESSAGE, 'messages');
    const handleSendingMessage = (message: string, receiverId: string, chatRoomId: string) => {
        console.log("message", message)
        console.log("chat room id", chatRoomId)
        console.log(" receiver id", receiverId)
    }
    return { handleSendingMessage }
}
