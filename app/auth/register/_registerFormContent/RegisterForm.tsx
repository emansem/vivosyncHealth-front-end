import { RegisterFieldTypes } from "@/app/lib/types";
import { REGISTER_FORM_FIELDS, UserType } from "@/data/registerFields";
import CheckBox from "@/src/components/ui/forms/CheckBox";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { TogglePassword } from "@/src/components/utils/PasswordToggle";
import useGeneralHook from "@/src/hooks/useGeneralHook";
import useRegister from "@/src/hooks/useRegisterForm";
import FormFooterPart from "./FormFooterPart";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

function RegisterForm() {
  const { isPasswordVisible, handleTogglePassword } = useGeneralHook();
  const { registerField, errors, handleSubmit, value, onSelect, isSubmitting } =
    useRegister();
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <form onSubmit={onSubmitHandler}>
      {REGISTER_FORM_FIELDS.map((field) =>
        field.type === "select" ? (
          <SelectInput
            key={field.name}
            options={UserType}
            onChange={onSelect}
            value={value}
            id={field.name}
          />
        ) : field.type !== "password" ? (
          <Input
            key={field.name}
            inputPlaceholder={field.placeHolder}
            id={field.name}
            inputType={field.type}
            {...registerField[field.name as keyof RegisterFieldTypes]}
            name={field.name}
            error={errors[field.name as keyof RegisterFieldTypes]?.message}
          />
        ) : (
          <div key={field.name} className=" relative">
            <Input
              inputPlaceholder={field.placeHolder}
              id={field.name}
              inputType={isPasswordVisible ? "text" : "password"}
              {...registerField[field.name as keyof RegisterFieldTypes]}
              name={field.name}
              error={errors[field.name as keyof RegisterFieldTypes]?.message}
            />
            <TogglePassword
              isVisable={isPasswordVisible}
              onClick={handleTogglePassword}
            />
          </div>
        )
      )}
      <CheckBox
        {...registerField["checkBox" as keyof RegisterFieldTypes]}
        error={errors["checkBox" as keyof RegisterFieldTypes]?.message}
      />
      <FormFooterPart isSubmitting={isSubmitting} />
    </form>
  );
}

export default RegisterForm;
