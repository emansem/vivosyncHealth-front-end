"use client";
import { useForm } from "react-hook-form";
import { formValidation } from "../helper/formValidation";
import { LoginFormValue } from "@/app/lib/types";
import { useApiPost } from "./serviceHook";
import { USER_TYPES } from "@/app/lib/constant";

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
      onSuccess: (result) => {
        localStorage.setItem("jwt", JSON.stringify(result.data.jwt));
        reset();

        if (USER_TYPES.DOCTOR === result.data.user_type) {
          setTimeout(() => (window.location.href = "/doctor/dashboard"), 400);
        } else if (USER_TYPES.PATIENT === result.data.user_type) {
          setTimeout(
            () => (window.location.href = "/patient/find-doctor"),
            400
          );
        }
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
