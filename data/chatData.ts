import { Message } from "@/src/types/messageTypes";

type SubscriptionReport = {
    day: string,
    inactive: number,
    active: number

}


export const weeklySubscriptionData: SubscriptionReport[] =
    [
        { day: "Monday", active: 12, inactive: 0 },
        { day: "Tuesday", active: 10, inactive: 2 },
        { day: "Wednesday", active: 1, inactive: 6 },
        { day: "Thursday", active: 7, inactive: 3 },
        { day: "Friday", active: 0, inactive: 0 },
        { day: "Saturday", active: 2, inactive: 9 },
        { day: "Sunday", active: 2, inactive: 7 },

    ]

// Mock data for doctors and patients
const DOCTOR_ID = "d123";
const PATIENT_ID = "p456";

// Sample messages array
export const demoMessages: Message[] = [
    {
        id: "msg1",
        senderId: PATIENT_ID,
        receiverId: DOCTOR_ID,
        content:
            "Hello Dr. Smith, I've been experiencing severe tooth pain since yesterday",
        timestamp: "2024-02-15T09:30:00Z",
        status: "read"
    },
    {
        id: "msg2",
        senderId: DOCTOR_ID,
        receiverId: PATIENT_ID,
        content:
            "Hello! I'm sorry to hear that. Can you describe the pain? Is it constant or intermittent?",
        timestamp: "2024-02-15T09:32:00Z",
        status: "read"
    },
    {
        id: "msg3",
        senderId: PATIENT_ID,
        receiverId: DOCTOR_ID,
        content: "It's constant, and gets worse when I drink cold water",
        timestamp: "2024-02-15T09:33:00Z",
        status: "read"
    },
    {
        id: "msg4",
        senderId: DOCTOR_ID,
        receiverId: PATIENT_ID,
        content:
            "I understand. This might be a sign of tooth sensitivity or a cavity. Have you noticed any swelling?",
        timestamp: "2024-02-15T09:35:00Z",
        status: "read"
    },
    {
        id: "msg5",
        senderId: PATIENT_ID,
        receiverId: DOCTOR_ID,
        content: "Yes, there's slight swelling on my left cheek",
        timestamp: "2024-02-15T09:36:00Z",
        status: "read"
    },
    {
        id: "msg6",
        senderId: DOCTOR_ID,
        receiverId: PATIENT_ID,
        content:
            "We should examine this as soon as possible. Would you be able to come in today?",
        timestamp: "2024-02-15T09:38:00Z",
        status: "read"
    },
    {
        id: "msg7",
        senderId: PATIENT_ID,
        receiverId: DOCTOR_ID,
        content: "Yes, I can come in today. What time works best?",
        timestamp: "2024-02-15T09:39:00Z",
        status: "delivered"
    },
    {
        id: "msg8",
        senderId: DOCTOR_ID,
        receiverId: PATIENT_ID,
        content: "I have an opening at 2:30 PM today. Would that work for you?",
        timestamp: "2024-02-15T09:40:00Z",
        status: "delivered"
    },
    {
        id: "msg9",
        senderId: PATIENT_ID,
        receiverId: DOCTOR_ID,
        content: "2:30 PM works perfectly. I'll be there",
        timestamp: "2024-02-15T09:41:00Z",
        status: "sent"
    },
    {
        id: "msg10",
        senderId: DOCTOR_ID,
        receiverId: PATIENT_ID,
        content:
            "Great, I'll see you then. Please bring any recent dental records if you have them.",
        timestamp: "2024-02-15T09:42:00Z",
        status: "sent"
    }
];