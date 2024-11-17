import { ReferralData, SubscriptionData } from "@/app/lib/types";

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

export const subscriptionData: SubscriptionData[] = [
    {
        id: "1",
        doctorName: "Dr. John Smith",
        doctorId: "DOC001",
        plan: "premium",
        startDate: "2024-01-15",
        endDate: "2024-12-15",
        status: "active",
        amount: 299,
        autoRenew: true
    },
    {
        id: "2",
        doctorName: "Dr. Sarah Johnson",
        doctorId: "DOC002",
        plan: "basic",
        startDate: "2024-02-01",
        endDate: "2024-03-01",
        status: "expired",
        amount: 99,
        autoRenew: false
    },
    {
        id: "3",
        doctorName: "Dr. Michael Chen",
        doctorId: "DOC003",
        plan: "enterprise",
        startDate: "2024-03-01",
        endDate: "2025-03-01",
        status: "active",
        amount: 499,
        autoRenew: true
    }
];