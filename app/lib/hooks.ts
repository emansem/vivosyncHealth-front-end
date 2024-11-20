/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react"
"use client"
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import type { RootState, AppDispatch } from '../lib/redux/store'
import { DoctorOnboardingForm, setError, updateFormData } from "./redux/features/form/multipleStepFormSlice"

import { STEP_ONE_FORM_FIELDS, STEP_TWO_FORM_FIELDS } from './constant'
import { ChangeEvent, useState } from 'react'
import { LoginFormValue, WithdrawalAccountData } from './types'
import { useForm } from 'react-hook-form'
import { withdrawalAccountFormValidation } from '@/src/helper/formValidation'
import { useMutation } from '@tanstack/react-query'
import { api } from './service/fetchData'
import axios from 'axios'



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

//Handle doctor withdrawal account
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

//handle open and close a model
export const useOpenAndClose = () => {
    const [open, setOpen] = useState(false);
    const handle0pen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return { handleClose, handle0pen, open }
}


// Handle upload image, preview and get the image files
export const useUPloadImage = () => {
    const [previewImage, setPreviewImage] = useState<string>("");
    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPreviewImage(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };
    return { previewImage, handlePhotoChange }
}



//login user
export const useLoginUser = () => {
    const loginUser = useMutation({
        mutationFn: (loginData: LoginFormValue) => {
            return api.post('/auth/login', loginData)

        },
        onSuccess: (data) => {
            console.log('Login succesfull', data.data);
            toast.success(data.data.message);


        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                // console.log("error logging user", error)
                const errorMessage = error.response?.data.message

                toast.error(errorMessage)
            }


        }

    })
    return { loginUser }
}

//Handle forgot password
export const useForgotPassword = () => {
    const forgotPassword = useMutation({
        mutationFn: (email: string) => {
            return api.post('/auth/forgot-password', { email })

        },
        onSuccess: (data) => {
            console.log(' succesfull', data.data);
            toast.success(data.data.message);


        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.log("error sending user email", error)
                const errorMessage = error.response?.data.message

                toast.error(errorMessage)
            }


        }

    })
    return { forgotPassword }
}

interface ChangePassword {
    password: string,
    confirm_password: string
}
export const useResetPassword = (token: string) => {
    const passwordMinLength = 6
    const [passwordValues, setPasswordValues] = useState<ChangePassword>({
        password: "",
        confirm_password: ''
    })
    const changePassword = useMutation({
        mutationFn: (passwordValues: ChangePassword) => {
            return api.put(`/auth//reset-password/?token=${token}`, passwordValues)
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        },
        onSuccess: (data) => {
            toast.success(data.data.message);
            setTimeout(() => {
                window.location.href = "http://localhost:3000/auth/login"
            }, 500);
        }
    })

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setPasswordValues(prev =>
            ({ ...prev, [name]: value })
        )

    }
    const handleSubmit = () => {
        if (passwordValues.password !== passwordValues.confirm_password) {
            return toast.error("Password donot match");
        } else if (!passwordValues.password || !passwordValues.confirm_password) {
            return toast.error("Please fill all the fields");
        } else if (passwordValues.password.length < passwordMinLength || passwordValues.confirm_password.length < passwordMinLength) {
            return toast.error("Password must be more than 6 characters");
        }
        if (!token) return
        changePassword.mutate(passwordValues)

    }

    return { handleOnChange, handleSubmit, isPending: changePassword.isPending }
}





















