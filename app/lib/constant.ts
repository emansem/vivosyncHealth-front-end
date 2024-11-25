import { FormFields, OnboardingFormFields, SubscriptionPlanType, WithdrawalAccountInputs } from "./types";

export const primary_color = "#269c65";
export const TOTAL_FORM_STEPS = 3;
export const FORM_FIELDS = {
    MEDICAL_LICENSE: 'medical_license',
    HOSPITAL_NAME: 'hospital_name',
    YEARS_OF_EXPERIENCE: 'years_of_experience',
    HOSPITAL_ADDRESS: "hospital_address"
} as const;
export const APIURL = "http://localhost:5740/api";


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
    },
]

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


export const accountBalance = 250000;
export const minWithdrawal = 10000;

export const PASSWORD_RESET_MESSAGE = "To reset your password, we've sent a verification link to your email address."

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

]

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
export const REFUND_DAYS_OPTION = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 }
];
export const PLAN_DURATION_OPTIONS = [
    { label: "1 year", value: 1 },
    { label: "30 Days", value: 30 }
];
export const PLAN_TYPE_OPTIONS = [
    { label: "Basic", value: "basic" },
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" }
];
export const IS_REFUND_SELECT_OPTIONS = [
    { label: "Please select a choice", value: "" },
    { label: "No", value: "no" },
    { label: "Yes", value: "yes" }
];

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
    },


]
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
    },
]
export const PLAN_STATUS_OPTIONS = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },

]

export const EMAIL_SUBJECT = {
    RESET_PASSWORD: 'RESET_PASSWORD',
    VERIFY_EMAIL: 'EMAIL_VERIFICATION',
}

export const USER_TYPES = {
    ADMIN: 'admin',
    PATIENT: 'patient',
    DOCTOR: 'doctor'
} as const;

export const EMAIL_VERIFICATION_MESSAGES = {
    standard:
        "Please enter the 5-digit code sent to your email address to verify your account.",

    detailed:
        "A verification code has been sent to your email address. Enter the 5-digit code below to verify your account. Codes expire after 10 minutes.",

    friendly:
        "We've sent a 5-digit code to your email. Type it below to confirm it's really you! 📧",

    formal:
        "For security purposes, please enter the 5-digit verification code that was sent to your registered email address.",

    withHelp:
        "Enter the 5-digit verification code from your email. Haven't received it? Check your spam folder or click 'Resend Code' below.",

    concise: "Enter 5-digit code sent to your email"
} as const

export const DOCTOR_API_END_POINTS = {
    SUBSCRIPTION_PLAN: {
        getPlan: "/doctors/plan",
        updatePlan: "/doctors/plan",
        getAllPlan: "/doctors/plans",
        deletePlan: '/doctors/plan'
    }
} as const

//All query keys to fetch data from the server
export const GET_ALL_PLANS_KEY = "plans";
