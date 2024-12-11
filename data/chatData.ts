import { User, Chat, Message } from "@/src/types/general";

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

// Demo doctors data
export const demoDoctors: User[] = [
    {
        id: "1",
        name: "Dr. Sarah Wilson",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Cardiologist"
    },
    {
        id: "2",
        name: "Dr. Michael Chen",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "offline",
        specialty: "Neurologist",
        lastSeen: new Date()
    },
    {
        id: "3",
        name: "Dr. Emily Brown",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Pediatrician"
    },
    {
        id: "4",
        name: "Dr. James Miller",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Dermatologist"
    },
    {
        id: "5",
        name: "Dr. Lisa Anderson",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "offline",
        specialty: "Psychiatrist"
    },
    {
        id: "6",
        name: "Dr. David Taylor",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Orthopedist"
    },
    {
        id: "7",
        name: "Dr. Maria Garcia",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Gynecologist"
    },
    {
        id: "8",
        name: "Dr. Robert Lee",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "offline",
        specialty: "Ophthalmologist"
    },
    {
        id: "9",
        name: "Dr. Jennifer White",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Endocrinologist"
    },
    {
        id: "10",
        name: "Dr. Thomas Martin",
        avatar: "/api/placeholder/40/40",
        role: "doctor",
        status: "online",
        specialty: "Oncologist"
    }
];

// Demo messages
// Generate demo chats

export const generateDemoMessages = (doctorId: string): Message[] => [
    {
        id: `${doctorId}-1`,
        content: "Good morning! How are you feeling today?",
        senderId: doctorId,
        timestamp: new Date(Date.now() - 3600000),
        isRead: true
    },
    {
        id: `${doctorId}-2`,
        content: `'I've been experiencing some improvement with the new medication.'`,
        senderId: "current-user",
        timestamp: new Date(Date.now() - 3300000),
        isRead: true
    },
    {
        id: `${doctorId}-3`,
        content: ` 'That's great to hear! Any side effects?'`,
        senderId: doctorId,
        timestamp: new Date(Date.now() - 3000000),
        isRead: true
    },
    {
        id: `${doctorId}-4`,
        content:
            "Just mild drowsiness in the morning, but it goes away after an hour.",
        senderId: "current-user",
        timestamp: new Date(Date.now() - 2700000),
        isRead: true
    },
    {
        id: `${doctorId}-5`,
        content: ` 'That's a common initial side effect. It should improve over time. Keep monitoring and let me know if it persists.'`,
        senderId: doctorId,
        timestamp: new Date(Date.now() - 2400000),
        isRead: true
    }
];

export const demoChats: Chat[] = demoDoctors.map((doctor) => ({
    id: doctor.id,
    participants: [doctor],
    lastMessage: generateDemoMessages(doctor.id)[4],
    unreadCount: Math.floor(Math.random() * 3)
}));


