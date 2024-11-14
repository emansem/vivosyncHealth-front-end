
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
