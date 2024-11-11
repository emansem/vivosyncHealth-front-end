"use client";
import { useForm } from "react-hook-form";
import { formValidation, } from "../helper/formValidation";
import { ChangeEvent, useState } from "react";
interface RegisterFieldTypes {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    name: string,
    checkBox: string

}
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
    //Pre-register the inputs
    const registerField = {
        email: register("email", formValidation.email),
        password: register("password", formValidation.password),
        phoneNumber: register("phoneNumber", formValidation.phoneNumber),
        name: register("name", formValidation.name),
        checkBox: register("checkBox", formValidation.checkBox)

    };
    const onSubmitForm = (data: RegisterFieldTypes) => {
        console.log("Form submitted", data, value);
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