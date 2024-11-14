// import { useState } from "react"
"use client"
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../lib/redux/store'
import { DoctorOnboardingForm, setError, updateFormData } from "./redux/features/form/multipleStepFormSlice"
import { setWithdrawalAccountData, setWithdrawalFormFieldsError, updateWithdrawalFormData } from "./redux/features/form/withdrawalAccountSlice"
import { STEP_ONE_FORM_FIELDS, STEP_TWO_FORM_FIELDS, WITHDRAWAL_ACCOUNT_FIELDS } from './constant'
import { ChangeEvent, useEffect, useState } from 'react'
import { WithdrawalAccountData } from './types'
import { useForm } from 'react-hook-form'
import { withdrawalAccountFormValidation } from '@/src/helper/formValidation'



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
interface ValidateFieldType {
    name: string
    placeholder: string,
}

export const useMultipleFormValidation = () => {
    const { formData } = useAppSelector((state) => state.doctorStep);
    const dispatch = useAppDispatch();

    const validateField = (field: ValidateFieldType): boolean => {
        if (!formData[field.name as keyof DoctorOnboardingForm].trim()) {
            dispatch(setError({
                field: field.name as keyof DoctorOnboardingForm,
                errorMessage: `${field.placeholder} is required`
            }));
            return false;
        }
        return true;
    }

    const validateStepOneForm = (): boolean => {
        for (const field of STEP_ONE_FORM_FIELDS) {
            if (!validateField(field)) {
                return false;
            }
        }
        return true; // All fields are valid
    };
    const validateStepTwoForm = (): boolean => {
        for (const field of STEP_TWO_FORM_FIELDS) {
            if (!validateField(field)) {
                return false;
            }

        }
        return true;
    }

    return { validateStepOneForm, validateStepTwoForm };
};


//Collect, validate and trim all doctor onboarding multiple step form 

export const useOnchangeDoctorOnboarding = () => {
    const dispatch = useAppDispatch();

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (value.trim()) {
            dispatch(
                setError({
                    field: name as keyof DoctorOnboardingForm,
                    errorMessage: ""
                })
            );
        }
        dispatch(
            updateFormData({
                field: name as keyof DoctorOnboardingForm,
                value: value.trim()
            })
        );
    };
    return { handleFormChange }
}

export const useWithdrawalAccount = () => {
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<WithdrawalAccountData>();

    const registerFields: Record<keyof WithdrawalAccountData, ReturnType<typeof register>> = {
        bank_name: register("bank_name", withdrawalAccountFormValidation.bank_name),
        account_number: register("account_number", withdrawalAccountFormValidation.account_number),
        account_name: register("account_name", withdrawalAccountFormValidation.account_name),
        withdrawal_password: register("withdrawal_password", withdrawalAccountFormValidation.withdrawal_password),

    }
    const onSubmit = async (data: WithdrawalAccountData) => {
        try {

            console.log('Form data:', data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return { registerFields, handleSubmit: handleSubmit(onSubmit), errors, isSubmitting }

}

export const useOpenAndClose = () => {
    const [open, setOpen] = useState(false);
    const handle0pen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return { handleClose, handle0pen, open }
}




















