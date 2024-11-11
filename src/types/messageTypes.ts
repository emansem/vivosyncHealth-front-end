export interface MessageBoxProps {
    closeMessageContainer: () => void;
}

// Types for messages
export type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    status: "sent" | "delivered" | "read";
};