import { PlanFeatures } from "@/src/hooks/pricingPlan/useUtileHook";
import { SubscriptionPlan } from "@/src/types/general";
import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";
import { DoctorOnboardingForm } from "./redux/features/form/multipleStepFormSlice";

// Token interface for authentication
export interface TokenType {
    token?: string
    email?: string,
    subject?: string,
}

// Props for displaying referral link component
export interface ReferralLinkProps {
    referralLink: string;
}

// Props for referral table display
export interface ReferralTableProps {
    referrals: ReferralData[];
}

// Generic API response structure
export interface ApiResponse<T> {
    message: string,
    status: string,
    email_subject: string,
    token?: string,
    user_type: string,
    jwt?: string,
    email?: string,
    data?: T
}

// Props for alert/warning component
export interface AlertProps {
    warningMessage: string
    buttonText: string | React.ReactNode;
    onClick?: () => void;
}

// Structure for withdrawal account input fields
export interface WithdrawalAccountInputs {
    name: string,
    placehoder: string,
    type: 'text' | "number" | "password"
}

// Interface for form validation errors
export interface FormErrors {
    [key: string]: string;
}

// Data structure for withdrawal account
export interface WithdrawalAccountData {
    bank_name: string;
    account_name: string;
    account_number: number;
    withdrawal_password: string;
}

// Form state for withdrawal account
export interface WithdrawalAccountForm {
    formData: WithdrawalAccountData;
    isSubmitting?: boolean;
    errors?: FormErrors;
}

// Generic form field structure
export interface FormFields {
    name: string;
    label: string;
    placeHolder: string;
    type: "text" | "number" | "password" | "tel" | "textArea" | "select" | "email";
}

// Doctor onboarding form field structure
export interface OnboardingFormFields {
    name: keyof DoctorOnboardingForm,
    placeholder: string,
    type: string
}

// Props for registration form inputs
export interface RegisterFormInputsProps {
    register: {
        email: UseFormRegisterReturn;
        password: UseFormRegisterReturn;
        name: UseFormRegisterReturn;
        phoneNumber: UseFormRegisterReturn;
        checkBox: UseFormRegisterReturn;
    };
    errors: {
        email?: { message: string };
        password?: { message: string };
        name?: { message: string };
        checkBox?: { message: string };
        phoneNumber?: { message: string };
    };
    isPasswordvisible: boolean;
}

// Registration API request structure
export interface RegisterApiRequest {
    name: string
    password: string
    email: string
    phone: string
    user_type: string
    gender: string
}

// Registration form field types
export interface RegisterFieldTypes {
    email: string;
    password: string;
    phoneNumber: string;
    name: string,
    checkBox: string
}

// Login form value structure
export interface LoginFormValue {
    email: string;
    password: string;
}

// Subscription plan type definition
export type SubscriptionPlanType = {
    label: string;
    key: "Basic" | "Standard" | "Premium";
};

// Props for review component
export interface ReviewProps {
    handleToggleReviews: (index: number) => void;
    activeIndices: number[];
}

// Props for subscription plan header
export interface SubscriptionPlanHeaderType {
    getPlanType: (label: string) => void;
    subscriptionPlan?: SubscriptionPlan[];
    plan_type: string;
}

// Structure for referral data
export interface ReferralData {
    id: string;
    referredUser: string;
    status: "pending" | "active" | "completed";
    joinedDate: string;
    reward: number;
}

// Props for stats card component
export interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
}

// Structure for subscription data
export interface SubscriptionData {
    id: number;
    doctor_name?: string;
    doctor_id: string;
    plan_type: "basic" | "premium" | "enterprise";
    created_at: string;
    expire_date: string | number;
    plan_id?: number,
    subscription_status: "active" | "expired" | "cancelled";
    amount: number;

    auto_renew?: boolean;
}

// Props for subscription table
export interface SubscriptionTableProps {
    subscriptions: SubscriptionData[];
}

// Structure for subscription plan data
export interface SubscriptionPlanDataType {
    name: string,
    amount: number,
    id?: number,
    discount_percentage: number,
    plan_type: "basic" | "standard" | "premium" | undefined
    plan_duration: "30" | "1",
    isRefundEnabled: "yes" | "no" | "",
    refund_period: string,
    plan_status: "active" | "inactive",
    plan_features: PlanFeatures[]
}