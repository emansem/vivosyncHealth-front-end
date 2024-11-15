"use client";
import { useForm } from "react-hook-form";
import { formValidation } from "../helper/formValidation";
import { LoginFormValue } from "@/app/lib/types";

function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm<LoginFormValue>();

  //Pre-register the inputs
  const registerField: Record<
    keyof LoginFormValue,
    ReturnType<typeof register>
  > = {
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
