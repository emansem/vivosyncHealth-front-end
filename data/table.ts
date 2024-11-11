import { PatientField, SubscriptionPlanMobileTypes } from "@/src/types/general";

//The mobile patientlist table fields lable
export const PATIENT_FIELDS: PatientField[] = [
    {
        label: "Name",
        key: "name"
    },
    {
        label: "Patient Id",
        key: "patientId"
    },
    {
        label: "Subscription Date",
        key: "subDate"
    },
    {
        label: "Expire Date",
        key: "expireDate"
    },
    {
        label: "Status",
        key: "status"
    }
];

//The desktop  patientlist lable fields
export const PATIENTLIST_TABLE_FIELDS = [
    "Name",
    "Patient Id",
    "Subscription Date",
    "Expired Date",
    "Status"
];

//Filter tags for patients list
export const filterTag = [
    { status: "All" },
    { status: "Active" },
    { status: "Expired" }
];

//Desktop view subscription plans data 
export const DOCTOR_SUBSCRIPTION_PLAN_FIELD = ["Name", "Price", "Coupon %", "Status", ""];

export const MobileSubscriptionPlansField: SubscriptionPlanMobileTypes[] = [
    {
        label: "Name",
        key: "name"
    },
    {
        label: "Price",
        key: "price"
    },

    {
        label: "Discount Percentage",
        key: "discountPercentage"
    },

    {
        label: "Status",
        key: "status"
    },
]


