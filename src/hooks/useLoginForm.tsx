"use client";
import { useForm } from "react-hook-form";
import { formValidation } from "../helper/formValidation";
import { LoginFormValue } from "@/app/lib/types";
import { useApiPost } from "./serviceHook";

function useLoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormValue>();
  const apiEndpoint = "/auth/login";
  const { mutate, isPending } = useApiPost<LoginFormValue, LoginFormValue>(
    apiEndpoint
  );

  const registerField: Record<
    keyof LoginFormValue,
    ReturnType<typeof register>
  > = {
    email: register("email", formValidation.email),
    password: register("password", formValidation.password)
  };
  const onSubmitForm = async (data: LoginFormValue) => {
    mutate(data, {
      onSuccess: () => {
        reset();
      }
    });
  };

  return {
    errors,
    isSubmitting: isPending,
    registerField,
    handleSubmit: handleSubmit(onSubmitForm)
  };
}

export default useLoginForm;
