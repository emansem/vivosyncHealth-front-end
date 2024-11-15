import { UseFormRegisterReturn } from "react-hook-form";

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