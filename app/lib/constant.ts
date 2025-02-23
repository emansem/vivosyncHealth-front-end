import { CreditCard, BadgeJapaneseYen, Wallet } from "lucide-react";
import { PaymentMethod } from "../patient/checkout/[planId]/page";
import { FormFields, InputsProps, OnboardingFormFields, SubscriptionData, SubscriptionPlanType, WithdrawalAccountInputs } from "./types";

export const SOCKET_SERVER = 'http://localhost:5740/';

// Application-wide theme color
export const primary_color = "#269c65";
// Colors
export const PRIMARY_COLOR = `#269c65`;
export const SECONDARY_COLOR = `#e8f5e9`;

// Color constants using stone palette
export const colors = {
    primary: "#269c65",
    secondary: "#e8f5e9",
    stone: {
        50: "#fafaf9",
        100: "#f5f5f4",
        200: "#e7e5e4",
        300: "#d6d3d1",
        400: "#a8a29e",
        500: "#78716c",
        600: "#57534e",
        700: "#44403c",
        800: "#292524",
        900: "#1c1917"
    }
};

// Total number of steps in the onboarding form
export const TOTAL_FORM_STEPS = 3;

// Constants for form field names used in medical professional registration
export const FORM_FIELDS = {
    MEDICAL_LICENSE: 'medical_license',
    HOSPITAL_NAME: 'hospital_name',
    YEARS_OF_EXPERIENCE: 'years_of_experience',
    HOSPITAL_ADDRESS: "hospital_address"
} as const;

// Base API URL for backend services
export const APIURL = "http://localhost:5740/api";

// Fields required for setting up withdrawal account information
export const WITHDRAWAL_ACCOUNT_FIELDS: WithdrawalAccountInputs[] = [
    {
        name: "bank_name",
        placehoder: "Enter your Bank name",
        type: "text"
    },
    {
        name: "account_name",
        placehoder: "Enter your Bank account name",
        type: "text"
    },
    {
        name: "account_number",
        placehoder: "Enter your Account number",
        type: "number"
    },
    {
        name: "withdrawal_password",
        placehoder: "Enter your withdrawal password",
        type: "password"
    }
];

// Step 1 of onboarding form: Professional Information
export const STEP_ONE_FORM_FIELDS: OnboardingFormFields[] = [
    {
        name: 'medical_license',
        placeholder: 'Medical license number',
        type: 'text'
    },
    {
        name: 'hospital_name',
        placeholder: 'Hospital name',
        type: 'text'
    },
    {
        name: 'speciality',
        placeholder: 'Specialities',
        type: 'text'
    },
    {
        name: 'years_of_experience',
        placeholder: 'Years of experience',
        type: 'text'
    },
    {
        name: 'hospital_address',
        placeholder: 'Hospital address',
        type: 'text'
    }
];

// Step 2 of onboarding form: Location and Availability
export const STEP_TWO_FORM_FIELDS: OnboardingFormFields[] = [
    {
        name: "country",
        placeholder: 'Country',
        type: 'text'
    },
    {
        name: "state",
        placeholder: 'State',
        type: 'text'
    },
    {
        name: "city",
        placeholder: 'City',
        type: 'text'
    },
    {
        name: "zip_code",
        placeholder: 'Zip code',
        type: 'text'
    },
    {
        name: "working_days",
        placeholder: 'Working days Exp : Monday, Friday',
        type: 'text'
    }
];

// Financial constants
export const accountBalance = 250000;
export const minWithdrawal = 10000;

// Password reset related constants
export const PASSWORD_RESET_MESSAGE = "To reset your password, we've sent a verification link to your email address.";

// Fields for password reset form
export const PASSWORD_REST_FIELDS: FormFields[] = [
    {
        name: "password",
        type: "password",
        placeHolder: "Enter new password",
        label: "New Password",
    },
    {
        name: "confirm_password",
        type: "password",
        placeHolder: "Confirm new password",
        label: "Confrim New Password",
    }
];

// Subscription plan types and related constants
export const SUBSCRIPTION_PLAN_TYPES: SubscriptionPlanType[] = [
    {
        label: "Basic",
        key: "Basic"
    },
    {
        label: "Standard",
        key: "Standard"
    },
    {
        label: "Premium",
        key: "Premium"
    }
];

// Options for refund period selection
export const REFUND_DAYS_OPTION = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 }
];

// Plan duration options
export const PLAN_DURATION_OPTIONS = [
    { label: "1 year", value: 1 },
    { label: "30 Days", value: 30 }
];

// Plan type selection options
export const PLAN_TYPE_OPTIONS = [
    { label: "Basic", value: "basic" },
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" }
];

// Refund selection options
export const IS_REFUND_SELECT_OPTIONS = [
    { label: "Please select a choice", value: "" },
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" }
];

// Fields for subscription plan input form
export const SUBSCRIPTION_PLAN_INPUTS_FIELD: FormFields[] = [
    {
        name: "name",
        placeHolder: "Plan name",
        label: "Plan Name",
        type: "text"
    },
    {
        name: 'amount',
        placeHolder: "Plan amount",
        label: "Plan Amount",
        type: "number"
    },
    {
        name: 'discount_percentage',
        placeHolder: "Discount percentage",
        label: "Discount Percentage",
        type: "number"
    }
];

// Selection fields for subscription plan configuration
export const SUBSCRIPTION_PLAN_SELECT_FIELDS: FormFields[] = [
    {
        name: "plan_type",
        placeHolder: "",
        label: "Choose Plan type",
        type: "text"
    },
    {
        name: "refundAnswer",
        placeHolder: "",
        label: "Choose Plan type",
        type: "text"
    },
    {
        name: "plan_status",
        placeHolder: "",
        label: "Active",
        type: "text"
    }
];

// Plan status options
export const PLAN_STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" }
];

// Email subject types
export const EMAIL_SUBJECT = {
    RESET_PASSWORD: 'RESET_PASSWORD',
    VERIFY_EMAIL: 'EMAIL_VERIFICATION'
} as const;

// User role types
export const USER_TYPES = {
    ADMIN: 'admin',
    PATIENT: 'patient',
    DOCTOR: 'doctor'
} as const;

// Various email verification messages for different contexts
export const EMAIL_VERIFICATION_MESSAGES = {
    standard: "Please enter the 5-digit code sent to your email address to verify your account.",
    detailed: "A verification code has been sent to your email address. Enter the 5-digit code below to verify your account. Codes expire after 10 minutes.",
    friendly: "We've sent a 5-digit code to your email. Type it below to confirm it's really you! 📧",
    formal: "For security purposes, please enter the 5-digit verification code that was sent to your registered email address.",
    withHelp: "Enter the 5-digit verification code from your email. Haven't received it? Check your spam folder or click 'Resend Code' below.",
    concise: "Enter 5-digit code sent to your email"
} as const;

// API endpoints for doctor-related operations
export const DOCTOR_API_END_POINTS = {
    SUBSCRIPTION_PLAN: {
        getPlan: "/doctors/plan",
        updatePlan: "/doctors/plan",
        getAllPlan: "/doctors/plans",
        deletePlan: '/doctors/plan',
        create: "/doctors/create-plan"
    },
    PROFILE: {
        updateProfile: "/doctors/update-profile",
        getDetails: "doctors/details"
    },
    WITHDRAWAL_ACCOUNT: {
        GET_WITHDRAWAL_ACCOUNT: "/doctors/withdrawal/account",
        CREATE_WITHDRAWAL_ACCOUNT: "/doctors/withdrawal/account/create",
        UPDATE_WITHDRAWAL_ACCOUNT: "/doctors/withdrawal/account/update"
    },
    dashboard: {
        getAllData: "/doctors/details/all"
    },
    SUBSCRIPTION: {
        GET_ALL_SUBSCRIPTION_DATA: '/doctors/all/subscription/details'
    }
} as const;

// Query keys for data fetching
export const GET_ALL_PLANS_KEY = "plans";
export const GET_USER_QUERY_KEY = 'user';
export const GET_WITHDRAWAL_ACCOUNT_QUERY_KEY = "withdrawalDetails";
export const GET_DOCTOR_DETAILS = 'doctor';

// Fields for updating withdrawal account information
export const UPDATE_WITHDRAWAL_ACCOUNT_FIELDS = [
    {
        name: "account_name",
        label: "Account Name",
        type: "text",
        placeHolder: "Enter account name"
    },
    {
        name: "bank_name",
        label: "Bank Name",
        type: "text",
        placeHolder: "Enter bank name"
    },
    {
        name: "account_number",
        label: "Account Number",
        type: "number",
        placeHolder: "Enter account number"
    }
];

// API endpoints for patient-related operations
export const PATIENT_API_ENDPOINTS = {
    DOCTOR: {
        getAllDoctors: "/patients/find-doctor",
        getDoctor: "/patients/find-doctor",
        getDoctorPlan: "/patients/doctor/plans"
    },
    PLAN: {
        getDoctorPlan: "/patients/subscription/plan"
    },
    PAYMENT: {
        collect: "/payment/collect",
        addAccountBalance: "/payment/add/balance",
        payWithBalance: "payment/collect/pay-with-balance"
    },
    SUBSCRIPTION: {
        getAllSubscription: "/patients/subscription/patient",
        getCurrentSubscription: "/patients/subscription/current/patient",
        updateSubscriptionStatus: "patients/subscription/current/patient/update"
    },
    PROFILE: {
        getProfileDetails: "/patients/profile/all/details",
        updatePersonalDetails: "/patients/update/personal-information/"
    }
} as const;

// Query keys for patient operations
export const PATIENT_QUERY_KEYS = {
    GET_ALL_DOCTORS: 'getAllDoctors',
};

// Headers for subscription table
export const subscriptionTableHeaders = [
    { key: "doctor_name", label: "Doctor Name", align: "left" },
    { key: "doctor_id", label: "Doctor ID", align: "left" },
    { key: "plan", label: "Plan", align: "left" },
    { key: "start_date", label: "Start Date", align: "left" },
    { key: "end_date", label: "End Date", align: "left" },
    { key: "status", label: "Status", align: "left" },
    { key: "amount", label: "Amount", align: "right" },
    { key: "action", label: "Action", align: "center" }
];

export const MOBILE_SUBSCRIPTION_TABLE_HEADER: { key: keyof SubscriptionData; label: string; }[] = [
    { key: "doctor_name", label: "Doctor Name" },
    { key: "doctor_id", label: "Doctor ID" },
    { key: "plan_type", label: "Plan" },
    { key: "created_at", label: "Start Date" },
    { key: "expire_date", label: "End Date" },
    { key: "subscription_status", label: "Status" },
    { key: "amount", label: "Amount" }
];

export const paymentMethods: PaymentMethod[] = [
    { id: "credit-card", name: "Credit Card", icon: CreditCard },
    { id: "mtn", name: "Mobile Money", icon: BadgeJapaneseYen },
    { id: "orange", name: "Orange Money", icon: Wallet }
];

export const PAYMENT_TYPE_OPTIONS = [
    {
        label: "Select",
        value: ""
    },
    {
        label: "Pay with balance",
        value: "payWithBalance"
    },
    {
        label: "Direct checkout",
        value: "directCheckout"
    }
];

export const GENERAL_API_END_POINTS = {
    GET_ACTIVE_SUBSCRIPTION: '/message/subscription/active',
    GET_CHAT_ROOM_ID: '/message/chat-room/find',
    SEND_MESSAGE: "/message/send-message",
    GET_ALL_MESSAGES: '/message/all-messages',
    GET_LAST_SENT_MESSAGE: "/message/chat-room/last-sent",
    GET_ALL_TRANSACTIONS: "/transactions/all",
    REQUEST_NEW_WITHDRAWAL: "withdrawal/request",
    GET_ALL_SUBSCRIPTION_DATA: '/subscriptions/all/doctor&patients',
    UPDATE_WITHDRAWAL_PASSWORD: "/settings/withdrawal/password",
    UPDATE_ACCOUNT_PASSWORD: "/settings/account/password",
    GET_APPLICATION_META_DATA: '/meta-data/all'

}

export const WITHDRAWAL_FORM_INPUTS = [
    {
        name: "amount",
        type: "number",
        placeHolder: "$ 0.00",
        label: "Withdrawal Amount"
    },
    {
        name: "password",
        type: "password",
        placeHolder: "Enter withdrawal password",
        label: " Withdrawal Password"
    }
];

//Transaction filter types select options
export const TRANSACTION_FILTER_TYPE = [
    {
        label: "All Types",
        value: "all"
    },
    {
        label: "Subscription",
        value: "subscription"
    },
    {
        label: "Withdrawal",
        value: "withdrawal"
    },
    {
        label: "Deposit",
        value: "deposit"
    }
];

//Transaction filter time or date range select options
export const TRANSACTION_FILTER_DATE_RANGE = [
    {
        label: "All Time",
        value: "all"
    },
    {
        label: "Today",
        value: "today"
    },
    {
        label: "This Week",
        value: "week"
    },
    {
        label: "THis Month",
        value: "month"
    },
    {
        label: "This Year",
        value: "year"
    }
];

export const CHANGE_PASSWORD_INPUTS: InputsProps[] = [
    {
        label: "Current Password",
        type: "password",
        placeHolder: "Current password",
        name: "currentPassword"
    },
    {
        label: "New Password",
        type: "password",
        placeHolder: "New Password",
        name: "newPassword"
    },
    {
        label: "Repeat Password",
        type: "password",
        placeHolder: "Confirm New Password",
        name: "repeatPassword"
    }
];

export const CHANGE_WITHDRAWAL_PASSWORD: InputsProps[] = [
    {
        label: "Current Password",
        type: "password",
        placeHolder: "Current password",
        name: "currentWithdrawalPassword"
    },
    {
        label: "New Password",
        type: "password",
        placeHolder: "New Password",
        name: "newWithdrawalPassword"
    },
    {
        label: "Repeat Password",
        type: "password",
        placeHolder: "Confirm New Password",
        name: "repeatWithdrawalPassword"
    }
];

export const SUBSCRIPTION_FILTER_OPTIONS = [
    {
        label: "Select Status",
        value: "all"
    },
    {
        label: "Active",
        value: "active"
    },
    {
        label: "Expired",
        value: "expired"
    },
    {
        label: "Cancelled",
        value: "cancelled"
    }
];


export const GENDER_OPTIONS = [
    {
        label: "Select gender",
        value: ""
    },
    {
        label: "Male",
        value: "male"
    },
    {
        label: "Female",
        value: "female"
    },
    {
        label: "Custom",
        value: "custom"
    }
];

export const ADMIN_API_END_POINT = {
    getAllTransactions: '/admin/transactions/all',
    getAllDoctorsDetails: "/admin/doctors/details/all",
    getAllPatientsData: "/admin/patients/details/all",
    getPatientById: "/admin/patients/single/details",
    updatePatientDetails: "/admin//patients/update/details",
    getAllAdminDashboardDetails: "/admin/dashboard/details/all",
    getAllAdminSubscriptionDetails: "/admin/subscriptions/details/all",
    getAllAdminGeneralSettings: "/admin/general-settings/all/details",
    updateAdminGeneralSettings: "/admin/general-settings/update/details"
}

// Constants for select options with enhanced descriptions
export const SUBSCRIPTION_DURATION_OPTIONS = [
    { value: "monthly", label: "Monthly - Flexible short-term commitment" },
    { value: "yearly", label: "Yearly - Save 20% with annual billing" }
];

export const USER_STATUS_OPTIONS = [
    { value: "active", label: "Active - System fully operational" },
    {
        value: "maintenance",
        label: "Maintenance - Scheduled updates in progress"
    },
    { value: "suspended", label: "Suspended - Temporarily disabled" }
];

// Information tooltips for each section
export const SECTION_INFO = {
    websiteInfo: "Basic information displayed across your platform",
    seo: "Improve your website's visibility on search engines",
    payment: "Configure your platform's financial settings",
    support: "Contact information for user assistance",
    status: "Control your website's operational status"
};


export const DoctorBasicInformation = [
    {
        label: 'Full Name',
        name: 'name',
        type: 'text',
        placeholder: 'Enter your full name'
    },
    {
        label: 'Email Address',
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email address'
    },
    {
        label: 'Phone Number',
        name: 'phone_number',
        type: 'text',
        placeholder: 'Enter your phone number'
    },

    {
        label: 'Medical License',
        name: 'medical_license',
        type: 'text',
        placeholder: 'Enter your medical license number'
    },
    {
        label: 'Years of Experience',
        name: 'years_of_experience',
        type: 'text',
        placeholder: 'Enter your years of experience'
    },

    {
        label: 'Speciality',
        name: 'speciality',
        type: 'text',
        placeholder: 'Enter your speciality'
    }
]

export const DoctorContactInformation = [
    {
        label: 'Hospital Name',
        name: 'hospital_name',
        type: 'text',
        placeholder: 'Enter your hospital name'
    },
    {
        label: "Email",
        name: 'email',
        type: 'email',
        placeholder: 'Enter your email address'
    },
    {
        label: 'Phone Number',
        name: 'phone_number',
        type: 'text',
        placeholder: 'Enter your phone number'
    },
    {
        label: 'Hospital Address',
        name: 'hospital_address',
        type: 'text',
        placeholder: 'Enter your hospital address'
    },
    {
        label: 'Country',
        name: 'country',
        type: 'text',
        placeholder: 'Enter your country'
    },
    {
        label: 'State',
        name: 'state',
        type: 'text',
        placeholder: 'Enter your state'
    },
    {
        label: 'City',
        name: 'city',
        type: 'text',
        placeholder: 'Enter your city'
    },
    {
        label: 'Zip Code',
        name: 'zip_code',
        type: 'text',
        placeholder: 'Enter your zip code'
    },
    {
        label: 'Working Days',
        name: 'working_days',
        type: 'text',
        placeholder: 'Enter your working days'
    }
]