import { demoChats, generateDemoMessages } from "@/data/chatData";
import { Chat, Message } from "@/src/types/general";
import { useState, useRef, useEffect } from "react";

export const useSendingMessage = () => {
    const [selectedChat, setSelectedChat] = useState<Chat | null>(demoChats[0]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(
        generateDemoMessages(demoChats[0].id)
    );
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
            setMessages(generateDemoMessages(selectedChat.id));
        }
    }, [selectedChat]);

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

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
        setMessage("");

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
    };

    return { adjustTextareaHeight, setMessage, message, textareaRef, handleSendMessage, selectedChat, showMobileChat, setShowMobileChat, setSelectedChat, demoChats, messageEndRef, messages }
}