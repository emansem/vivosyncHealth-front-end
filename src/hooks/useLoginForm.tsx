"use client";
import { useForm } from "react-hook-form";
import { formValidation } from "../helper/formValidation";
interface LoginFormValue {
  email: string;
  password: string;
}

function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<LoginFormValue>();

  //Pre-register the inputs
  const registerField = {
    email: register("email", formValidation.email),
    password: register("password", formValidation.password)
  };
  const onSubmitForm = (data: LoginFormValue) => {
    console.log("Form submitted", data);
  };
  return {
    errors,
    isSubmitting,
    registerField,
    handleSubmit: handleSubmit(onSubmitForm)
  };
}

export default useLoginForm;
