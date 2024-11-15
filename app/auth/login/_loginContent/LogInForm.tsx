import Input from "@/src/components/ui/forms/Input";
import useLoginForm from "@/src/hooks/useLoginForm";
import { TogglePassword } from "@/src/components/utils/PasswordToggle";
import useGeneralHook from "@/src/hooks/useGeneralHook";
import LoginFormFooterSection from "../_loginContent/LoginFormFooterSection";
import { LOGIN_INPUTS_FIELD } from "@/data/loginFormInputsField";
import { LoginFormValue } from "@/app/lib/types";

export const LogInForm = () => {
  const { isPasswordVisible, handleTogglePassword } = useGeneralHook();
  const { registerField, errors, handleSubmit, isSubmitting } = useLoginForm();

  return (
    <form onSubmit={handleSubmit}>
      {/* LOGIN FORM INPUTS */}
      {LOGIN_INPUTS_FIELD.map((field) =>
        field.type === "password" ? (
          <div className=" relative">
            <Input
              {...registerField[field.name as keyof LoginFormValue]}
              name={field.name}
              error={errors[field.name as keyof LoginFormValue]?.message}
              key={field.name}
              inputPlaceholder={field.placeHolder}
              id={field.name}
              inputType={isPasswordVisible ? "text" : "password"}
            />
            <TogglePassword
              isVisable={isPasswordVisible}
              onClick={handleTogglePassword}
            />
          </div>
        ) : (
          <Input
            key={field.name}
            {...registerField[field.name as keyof LoginFormValue]}
            name={field.name}
            error={errors[field.name as keyof LoginFormValue]?.message}
            inputPlaceholder={field.placeHolder}
            id={field.name}
            inputType={field.type}
          />
        )
      )}
      {/* Login footer section for sign in and goodle sigin button */}
      <LoginFormFooterSection isSubmitting={isSubmitting} />
    </form>
  );
};
