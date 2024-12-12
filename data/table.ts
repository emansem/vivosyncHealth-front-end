import { PatientField, SubscriptionPlanMobileTypes } from "@/src/types/general";

//The mobile patientlist table fields lable
export const PATIENT_FIELDS: PatientField[] = [
    {
        label: "Plan Type",
        key: "plan_type"
    },
    {
        label: "Plan Amount",
        key: "amount"
    },
    {
        label: "Subscription Date",
        key: "created_at"
    },
    {
        label: "Expire Date",
        key: "expire_date"
    },
    {
        label: "Status",
        key: "subscription_status"
    }
];

//The desktop  patientlist lable fields
export const PATIENTLIST_TABLE_FIELDS = [
    "Plan Type",
    "Amount",
    "Subscription Date",
    "Expired Date",
    "Status"
];

//Filter tags for patients list
export const filterTag = [
    { status: "All" },
    { status: "Active" },
    { status: "Expired" },
    { status: "Cancelled" }
];

//Desktop view subscription plans data 
export const DOCTOR_SUBSCRIPTION_PLAN_FIELD = ["Plan Type", "Price", "Discount %", "Duration", "Status", ""];

export const MobileSubscriptionPlansField: SubscriptionPlanMobileTypes[] = [
    {
        label: "Plan Type",
        key: "plan_type"
    },
    {
        label: "Price",
        key: "amount"
    },
    {
        label: "Duration",
        key: "plan_duration"
    },

    {
        label: "Discount Percentage",
        key: "discount_percentage"
    },

    {
        label: "Status",
        key: "plan_status"
    },
]


