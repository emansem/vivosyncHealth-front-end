// Define the type for better TypeScript support
type PatientChat = {
    id: number;
    name: string;
    recent_message: string;
    time: string;
    image_url: string;
    status: 'online' | 'offline' | 'away';
    unread: number;
    appointment_type?: string;
    last_visit?: string;
    patient_id?: string;
}

export const demoPatientChats: PatientChat[] = [
    {
        id: 1,
        name: "John Smith",
        recent_message: "I need to reschedule my dental cleaning appointment",
        time: "09:30 AM",
        image_url: "https://ui-avatars.com/api/?name=John+Smith&background=random",
        status: "online",
        unread: 2,
        appointment_type: "Dental Cleaning",
        patient_id: "P-1001",
        last_visit: "2024-01-15"
    },
    {
        id: 2,
        name: "Maria Garcia",
        recent_message: "When should I take my new medication?",
        time: "10:15 AM",
        image_url: "https://ui-avatars.com/api/?name=Maria+Garcia&background=random",
        status: "offline",
        unread: 1,
        appointment_type: "Follow-up",
        patient_id: "P-1002",
        last_visit: "2024-02-20"
    },
    {
        id: 3,
        name: "Robert Wilson",
        recent_message: "My tooth still hurts after the procedure",
        time: "Yesterday",
        image_url: "https://ui-avatars.com/api/?name=Robert+Wilson&background=random",
        status: "online",
        unread: 3,
        appointment_type: "Emergency",
        patient_id: "P-1003",
        last_visit: "2024-02-28"
    },
    {
        id: 4,
        name: "Emma Thompson",
        recent_message: "Can I get my x-ray results?",
        time: "Yesterday",
        image_url: "https://ui-avatars.com/api/?name=Emma+Thompson&background=random",
        status: "away",
        unread: 0,
        appointment_type: "X-Ray Review",
        patient_id: "P-1004",
        last_visit: "2024-02-25"
    },
    {
        id: 5,
        name: "James Chen",
        recent_message: "I'm having sensitivity to hot and cold",
        time: "Tuesday",
        image_url: "https://ui-avatars.com/api/?name=James+Chen&background=random",
        status: "online",
        unread: 4,
        appointment_type: "Consultation",
        patient_id: "P-1005",
        last_visit: "2024-02-10"
    },
    {
        id: 6,
        name: "Sarah Brown",
        recent_message: "My gums are bleeding when brushing",
        time: "Monday",
        image_url: "https://ui-avatars.com/api/?name=Sarah+Brown&background=random",
        status: "offline",
        unread: 0,
        appointment_type: "Periodontal",
        patient_id: "P-1006",
        last_visit: "2024-01-30"
    },
    {
        id: 78,
        name: "Emma Thompson",
        recent_message: "Can I get my x-ray results?",
        time: "Yesterday",
        image_url: "https://ui-avatars.com/api/?name=Emma+Thompson&background=random",
        status: "away",
        unread: 0,
        appointment_type: "X-Ray Review",
        patient_id: "P-1004",
        last_visit: "2024-02-25"
    },
    {
        id: 123,
        name: "James Chen",
        recent_message: "I'm having sensitivity to hot and cold",
        time: "Tuesday",
        image_url: "https://ui-avatars.com/api/?name=James+Chen&background=random",
        status: "online",
        unread: 4,
        appointment_type: "Consultation",
        patient_id: "P-1005",
        last_visit: "2024-02-10"
    },
    {
        id: 233,
        name: "Sarah Brown",
        recent_message: "My gums are bleeding when brushing",
        time: "Monday",
        image_url: "https://ui-avatars.com/api/?name=Sarah+Brown&background=random",
        status: "offline",
        unread: 0,
        appointment_type: "Periodontal",
        patient_id: "P-1006",
        last_visit: "2024-01-30"
    }
];