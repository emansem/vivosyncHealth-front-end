"use client";
import { useForm } from "react-hook-form";
import { formValidation, } from "../../helper/formValidation";
import { RegisterApiRequest, RegisterFieldTypes } from "@/app/lib/types";
import { useApiPost } from "../serviceHook";
import useGeneralHook from "../useGeneralHook";

function useRegister() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFieldTypes>();
    const { handleOnSelect, selectedValue } = useGeneralHook()

    const apiEndpoint = 'auth/register'
    const { mutate, isPending } = useApiPost<RegisterApiRequest, RegisterApiRequest>(apiEndpoint)

    //Register the inputs fields are validate them 
    const registerField: Record<keyof RegisterFieldTypes, ReturnType<typeof register>> = {
        email: register("email", formValidation.email),
        password: register("password", formValidation.password),
        phoneNumber: register("phoneNumber", formValidation.phoneNumber),
        name: register("name", formValidation.name),
        checkBox: register("checkBox", formValidation.checkBox)

    };

    // A function to submit the form
    const onSubmitForm = async (data: RegisterFieldTypes) => {

        const userData = {
            name: data.name,
            password: data.password,
            email: data.email,
            phone: data.phoneNumber,
            user_type: selectedValue,
            gender: 'not_specify'
        }
        if (userData) {
            mutate(userData, {
                onSuccess: () => {
                    // const { token } = data.data
                    //Reset the input fields after the user was registerd successfully
                    reset()
                    setTimeout(() => {
                        window.location.href = `http://localhost:3000/auth/verify-email`
                    }, 1000);
                }
            })
        }
    };
    return {
        errors,
        handleOnSelect,
        value: selectedValue,
        isSubmitting: isPending,
        registerField,
        handleSubmit: handleSubmit(onSubmitForm)
    };
}

export default useRegister;