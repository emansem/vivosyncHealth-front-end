"use client";
import { useForm } from "react-hook-form";
import { formValidation, } from "../helper/formValidation";
import { ChangeEvent, useState } from "react";
import { RegisterFieldTypes } from "@/app/lib/types";
import { useRegisterUser } from "@/app/lib/hooks";

function useRegister() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFieldTypes>();
    //Get a value from a select a option
    const [value, setValue] = useState<string>("");
    const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);

    }
    const { createUser } = useRegisterUser()
    //Pre-register the inputs
    const registerField: Record<keyof RegisterFieldTypes, ReturnType<typeof register>> = {
        email: register("email", formValidation.email),
        password: register("password", formValidation.password),
        phoneNumber: register("phoneNumber", formValidation.phoneNumber),
        name: register("name", formValidation.name),
        checkBox: register("checkBox", formValidation.checkBox)

    };
    const onSubmitForm = async (data: RegisterFieldTypes) => {

        const userData = {
            name: data.name,
            password: data.password,
            email: data.email,
            phone: data.phoneNumber,
            user_type: value,
            gender: 'not_specify'
        }
        createUser.mutate(userData)


    };
    return {
        errors,
        onSelect,
        value,
        isSubmitting,
        registerField,
        handleSubmit: handleSubmit(onSubmitForm)
    };
}

export default useRegister;