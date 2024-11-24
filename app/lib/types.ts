import { UseFormRegisterReturn } from "react-hook-form";
import { DoctorOnboardingForm } from "./redux/features/form/multipleStepFormSlice";
import { SubscriptionPlan } from "@/src/types/general";
import { LucideIcon } from "lucide-react";
import { PlanFeatures } from "@/src/hooks/usePricingPlan";

export interface TokenType {
    token?: string
    email?: string,
    subject?: string,
}
export interface ReferralLinkProps {
    referralLink: string;
}

export interface ReferralTableProps {
    referrals: ReferralData[];
}
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
export interface AlertProps {
    warningMessage: string
    buttonText: string | React.ReactNode;
    onClick?: () => void;
}

export interface WithdrawalAccountInputs {
    name: string,
    placehoder: string,
    type: 'text' | "number" | "password"
}

export interface FormErrors {
    [key: string]: string;
}

export interface WithdrawalAccountData {
    bank_name: string;
    account_name: string;
    account_number: number;
    withdrawal_password: string;
}
export interface WithdrawalAccountForm {
    formData: WithdrawalAccountData;
    isSubmitting?: boolean;
    errors?: FormErrors;
}
export interface FormFields {
    name: string;
    label: string;
    placeHolder: string;
    type: "text" | "number" | "password" | "tel" | "textArea" | "select" | "email";
}

export interface OnboardingFormFields {
    name: keyof DoctorOnboardingForm,
    placeholder: string,
    type: string
}



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
export interface RegisterApiRequest {
    name: string
    password: string
    email: string
    phone: string
    user_type: string
    gender: string
}

export interface RegisterFieldTypes {
    email: string;
    password: string;
    phoneNumber: string;
    name: string,
    checkBox: string

}

export interface LoginFormValue {
    email: string;
    password: string;
}

export type SubscriptionPlanType = {
    label: string;
    key: "Basic" | "Standard" | "Premium";
};

export interface ReviewProps {
    handleToggleReviews: (index: number) => void;

    activeIndices: number[];
}

export interface SubscriptionPlanHeaderType {
    getPlanType: (label: string) => void;
    subscriptionPlan?: SubscriptionPlan[];
    plan_type: string;
}

export interface ReferralData {
    id: string;
    referredUser: string;
    status: "pending" | "active" | "completed";
    joinedDate: string;
    reward: number;
}


export interface StatsCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
}
export interface SubscriptionData {
    id: string;
    doctorName: string;
    doctorId: string;
    plan: "basic" | "premium" | "enterprise";
    startDate: string;
    endDate: string;
    status: "active" | "expired" | "cancelled";
    amount: number;
    autoRenew: boolean;
}

export interface SubscriptionTableProps {
    subscriptions: SubscriptionData[];
}
export interface SubscriptionPlanDataType {
    name: string,
    amount: number,
    discount_percentage: number,
    plan_type: string,
    plan_duration: string,
    isRefundEnabled: "yes" | "no" | "",
    refund_period: string,
    plan_status: "active" | "inactive",
    plan_features: PlanFeatures[]

}
