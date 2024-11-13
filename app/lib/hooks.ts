// import { useState } from "react"

import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../lib/redux/store'
import { DoctorOnboardingForm, setError, updateFormData } from "./redux/features/form/multipleStepFormSlice"
import { STEP_ONE_FORM_FIELDS, STEP_TWO_FORM_FIELDS } from './constant'
import { ChangeEvent } from 'react'



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























