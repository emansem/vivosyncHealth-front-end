"use client";
import { useForm } from "react-hook-form";
import { formValidation } from "../helper/formValidation";
import { LoginFormValue } from "@/app/lib/types";
import { useLoginUser } from "@/app/lib/hooks";

function useLoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormValue>();
  const { loginUser } = useLoginUser();
  const isPending = loginUser.isPending;

  //Pre-register the inputs
  const registerField: Record<
    keyof LoginFormValue,
    ReturnType<typeof register>
  > = {
    email: register("email", formValidation.email),
    password: register("password", formValidation.password)
  };
  const onSubmitForm = async (data: LoginFormValue) => {
    loginUser.mutate(data, {
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
