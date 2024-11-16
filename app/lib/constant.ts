import { DoctorOnboardingForm } from "./redux/features/form/multipleStepFormSlice";
import { FormFields, OnboardingFormFields, SubscriptionPlanType, WithdrawalAccountInputs } from "./types";

export const primary_color = "#269c65";
export const TOTAL_FORM_STEPS = 3;
export const FORM_FIELDS = {
    MEDICAL_LICENSE: 'medical_license',
    HOSPITAL_NAME: 'hospital_name',
    YEARS_OF_EXPERIENCE: 'years_of_experience',
    HOSPITAL_ADDRESS: "hospital_address"
} as const;



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
export const EMAIL_VERIFICATION_MESSAGE = `We've sent a verification link to your email address. Please check your inbox and click the link to your account`

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

