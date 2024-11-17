import { ReferralData } from "@/app/lib/types";

// Sample referral data
export const referralData: ReferralData[] = [
    {
        id: "1",
        referredUser: "John Doe",
        status: "active",
        joinedDate: "2024-03-15",
        reward: 50
    },
    {
        id: "2",
        referredUser: "Jane Smith",
        status: "pending",
        joinedDate: "2024-03-14",
        reward: 0
    },
    {
        id: "3",
        referredUser: "Mike Johnson",
        status: "completed",
        joinedDate: "2024-03-10",
        reward: 50
    }
];