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

// Demo subscription data
// export const subscriptionData: SubscriptionData[] = [
//     {
//         id: "sub_001",
//         doctor_name: "Dr. John Smith",
//         doctor_id: "DOC_123",
//         plan: "premium",
//         created_at: "2024-01-15T10:30:00Z",
//         expire_date: "2025-01-15T10:30:00Z",
//         subscription_status: "active",
//         amount: 299.99,
//         plan_type: "yearly",
//         auto_renew: true
//     },
//     {
//         id: "sub_002",
//         doctor_name: "Dr. Sarah Johnson",
//         doctor_id: "DOC_456",
//         plan: "basic",
//         created_at: "2023-11-20T14:45:00Z",
//         expire_date: "2024-11-20T14:45:00Z",
//         subscription_status: "active",
//         amount: 149.99,
//         plan_type: "monthly",
//         auto_renew: true
//     },
//     {
//         id: "sub_003",
//         doctor_name: "Dr. Michael Chen",
//         doctor_id: "DOC_789",
//         plan: "enterprise",
//         created_at: "2023-08-05T09:15:00Z",
//         expire_date: "2024-02-05T09:15:00Z",
//         subscription_status: "expired",
//         amount: 599.99,
//         plan_type: "semi-annual",
//         auto_renew: false
//     },
//     {
//         id: "sub_004",
//         doctor_name: "Dr. Emily Wilson",
//         doctor_id: "DOC_234",
//         plan: "premium",
//         created_at: "2023-12-01T11:00:00Z",
//         expire_date: "2024-12-01T11:00:00Z",
//         subscription_status: "active",
//         amount: 299.99,
//         plan_type: "yearly",
//         auto_renew: true
//     },
//     {
//         id: "sub_005",
//         doctor_name: "Dr. Robert Brown",
//         doctor_id: "DOC_567",
//         plan: "basic",
//         created_at: "2023-10-15T16:20:00Z",
//         expire_date: "2024-04-15T16:20:00Z",
//         subscription_status: "cancelled",
//         amount: 149.99,
//         plan_type: "monthly",
//         auto_renew: false
//     },
//     {
//         id: "sub_006",
//         doctor_name: "Dr. Lisa Martinez",
//         doctor_id: "DOC_890",
//         plan: "enterprise",
//         created_at: "2024-02-01T13:30:00Z",
//         expire_date: "2025-02-01T13:30:00Z",
//         subscription_status: "active",
//         amount: 599.99,
//         plan_type: "yearly",
//         auto_renew: true
//     },
//     {
//         id: "sub_007",
//         doctor_name: "Dr. David Kim",
//         doctor_id: "DOC_345",
//         plan: "premium",
//         created_at: "2023-09-10T08:45:00Z",
//         expire_date: "2024-03-10T08:45:00Z",
//         subscription_status: "expired",
//         amount: 299.99,
//         plan_type: "semi-annual",
//         auto_renew: false
//     },
//     {
//         id: "sub_008",
//         doctor_name: "Dr. Rachel Green",
//         doctor_id: "DOC_678",
//         plan: "basic",
//         created_at: "2024-01-20T15:10:00Z",
//         expire_date: "2024-07-20T15:10:00Z",
//         subscription_status: "active",
//         amount: 149.99,
//         plan_type: "monthly",
//         auto_renew: true
//     }
// ];