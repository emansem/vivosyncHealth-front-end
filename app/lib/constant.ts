import { DoctorOnboardingForm } from "./redux/features/form/multipleStepFormSlice";

export const primary_color = "#269c65";
export const TOTAL_FORM_STEPS = 3;
export const FORM_FIELDS = {
    MEDICAL_LICENSE: 'medical_license',
    HOSPITAL_NAME: 'hospital_name',
    YEARS_OF_EXPERIENCE: 'years_of_experience',
    HOSPITAL_ADDRESS: "hospital_address"
} as const;

// Better structure for looping:
interface FormFields {
    name: keyof DoctorOnboardingForm,
    placeholder: string,
    type: string
}
interface WithdrawalAccount {
    name: string,
    placehoder: string,
    type: 'text' | "number" | "password"
}
export const WITHDRAWAL_ACCOUNT_FIELDS: WithdrawalAccount[] = [
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
        name: "pin_code",
        placehoder: "Enter your withdrawal password",
        type: "password"
    },
]

export const STEP_ONE_FORM_FIELDS: FormFields[] = [
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

export const STEP_TWO_FORM_FIELDS: FormFields[] = [
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
