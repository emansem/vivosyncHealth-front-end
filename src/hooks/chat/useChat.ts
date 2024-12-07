// Import statements and type definitions
import { useState, useRef, useEffect, useCallback } from "react";
import { useGetUser, UserType } from "../serviceHook";
import { EmojiClickData } from "emoji-picker-react";
import { useSendMessages } from "./useSendMessage";
import { useChatRoom } from "./useChatRoom";
import { useGetAllMessages } from "./useGetAllMessages";
import { useGetActiveSubscription } from "./useGetActiveSubscription";

/**
 * Main hook for managing chat messaging functionality
 * 
 * This custom hook encapsulates all the complex logic needed for a real-time chat interface,
 * following the principle of separation of concerns. It handles:
 * 
 * 1. Message composition and sending
 * 2. Chat room management and switching
 * 3. User selection and active user tracking
 * 4. Real-time message synchronization
 * 5. UI state management for mobile responsiveness
 * 
 * The hook follows React's composition pattern, combining multiple smaller hooks
 * (useChatRoom, useSendMessages, etc.) to build a complete messaging solution.
 */
export const useSendingMessage = () => {
    // Core state management for active users and loading states
    // Using separate hooks for different concerns improves maintainability
    const { activeUsers, isLoading } = useGetActiveSubscription();
    const { handleGetReceiverId, currentRoom } = useChatRoom();
    const { data: userData } = useGetUser();

    // Local state management for UI and message handling
    const [receiverID, setReceiverID] = useState("");
    const [message, setMessage] = useState("");
    const [selectedChat, setSelectedChat] = useState<UserType | null>(null);
    const [showMobileChat, setShowMobileChat] = useState(false);
    const [chatRoomId, setChatRoomId] = useState(currentRoom);

    // Destructure complex messaging logic from a separate hook
    // This separation allows for easier testing and maintenance
    const {
        handleSendingMessage,
        status,
        lastMessage,
        joinChatRoom,
        messages,
        setMessages
    } = useSendMessages();

    // Track current user for message attribution
    const currentUser = userData?.data.user.user_id;

    /**
     * Emoji handling logic
     * Implements a non-destructive message update pattern by concatenating
     * the new emoji to the existing message
     */
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setMessage(currentMessage => currentMessage + emojiData.emoji);
    };

    // DOM references for scroll management and textarea sizing
    const messageEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Fetch messages for the current room using a dedicated hook
    const { data } = useGetAllMessages(chatRoomId as string);

    /**
     * Scroll management utility
     * Uses useCallback to prevent unnecessary re-renders while ensuring
     * the chat window always shows the latest messages
     */
    const scrollToBottom = useCallback(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // Effect hooks for managing component lifecycle and state synchronization

    // Auto-scroll effect that triggers on new messages
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // Synchronize messages when chat selection or message data changes
    useEffect(() => {
        if (selectedChat && data?.data.messages) {
            setMessages(data.data.messages);
        }
    }, [selectedChat, data?.data.messages, setMessages]);

    // Handle chat room connection when room changes
    useEffect(() => {
        if (currentRoom) {
            joinChatRoom(currentRoom as string);
            setChatRoomId(currentRoom)
        }
    }, [currentRoom, joinChatRoom]);

    // Initialize with first active user when the list loads
    useEffect(() => {
        if (activeUsers && activeUsers?.length > 0) {
            setReceiverID(activeUsers[0].user_id);
            setChatRoomId(currentRoom)
        }
    }, [activeUsers, currentRoom]);

    /**
     * Dynamic textarea height adjustment
     * Uses a non-destructive approach to resize the input field based on content,
     * improving user experience without causing layout shifts
     */
    const adjustTextareaHeight = useCallback(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, []);

    /**
     * Chat selection handler
     * Manages the complex state updates required when switching between chats,
     * ensuring all related states are updated atomically
     */
    const handleSetSelectChat = useCallback((user: UserType | null) => {
        if (!user) return;

        setSelectedChat(user);
        setShowMobileChat(true);
        handleGetReceiverId(user.user_id);
        setReceiverID(user.user_id);
    }, [handleGetReceiverId]);

    /**
     * Message sending handler
     * Implements input validation and state cleanup after sending
     * to maintain a consistent UI state
     */
    const handleSendMessage = useCallback(() => {
        // Validate all required fields before sending
        if (!message.trim() || !receiverID || !currentRoom || !currentUser) return;

        handleSendingMessage(message, receiverID, currentRoom as string);
        setMessage("");

        // Reset textarea height after sending
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    }, [message, receiverID, currentRoom, currentUser, handleSendingMessage]);

    // Return all necessary values for the chat interface
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