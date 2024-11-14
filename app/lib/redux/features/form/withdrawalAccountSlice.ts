

import { WithdrawalAccountForm, WithdrawalAccountData } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const withdrawalAccount: WithdrawalAccountData = {
    bank_name: "",
    account_name: "",
    account_number: 0,
    withdrawal_password: ''
}
const INITIAL_STATE: WithdrawalAccountForm = {
    formData: withdrawalAccount,
    errors: {}
}

const savedData = localStorage.getItem("withdrawalAccount");
if (savedData) {
    const loadedData = JSON.parse(savedData);
    INITIAL_STATE.formData = loadedData;

}
const withdrawalAccountSlice = createSlice({
    name: "withdrawalAccount",
    initialState: INITIAL_STATE,
    reducers: {
        updateWithdrawalFormData: (state, action: PayloadAction<{ value: string, field: keyof WithdrawalAccountData }>) => {
            const { field, value } = action.payload;
            if (field === "account_number") {
                state.formData[field] = Number(value);
            } else {
                state.formData[field] = value
            }
        },
        setWithdrawalAccountData: (state, action: PayloadAction<WithdrawalAccountData>) => {
            state.formData = action.payload
        },
        setWithdrawalFormFieldsError: (state, action: PayloadAction<{ errorMessage: string, field: keyof WithdrawalAccountData }>) => {
            const { field, errorMessage } = action.payload
            if (state.errors) {
                state.errors[field] = errorMessage;
            }

        }
    }
})
export const { updateWithdrawalFormData, setWithdrawalAccountData, setWithdrawalFormFieldsError } = withdrawalAccountSlice.actions;
export default withdrawalAccountSlice.reducer;