"use client";
import AuthSwitch from "@/src/components/ui/auth/AuthSwitch";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { FcGoogle } from "react-icons/fc";
import { UseFormRegisterReturn } from "react-hook-form";
import { TogglePassword } from "@/src/components/utils/PasswordToggle";
import useRegister from "@/src/hooks/useRegisterForm";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import CheckBox from "@/src/components/ui/forms/CheckBox";
import useGeneralHook from "@/src/hooks/useGeneralHook";

interface FormInputsProps {
  register: {
    email: UseFormRegisterReturn;
    password: UseFormRegisterReturn;
    name: UseFormRegisterReturn;
    phoneNumber: UseFormRegisterReturn;
    checkBox: UseFormRegisterReturn;
  };
  errors: {
    email?: { message: string };
    password?: { message: string };
    name?: { message: string };
    checkBox?: { message: string };
    phoneNumber?: { message: string };
  };
  isPasswordvisible: boolean;
}

//sing in button
const SignUpButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <PrimaryButton backgroud={true} isSubmitting={isSubmitting}>
      <span className="font-[500] text-gray-100">
        {isSubmitting ? "Loading..." : "Register"}
      </span>
    </PrimaryButton>
  );
};

const GoogleInButton = () => {
  return (
    <PrimaryButton backgroud={false}>
      <div className="flex justify-center items-center gap-4">
        <span className="text-3xl">
          <FcGoogle />
        </span>
        <span className="font-[500] text-stone-500">Sign up with Google</span>
      </div>
    </PrimaryButton>
  );
};

//Form inputs to submit
const FormInputs = ({
  register,
  errors,
  onSelect,
  value
}: FormInputsProps | any) => {
  const options = [
    {
      label: "Select user type",
      value: ""
    },
    {
      label: "Doctor",
      value: "doctor"
    },
    {
      label: "Patient",
      value: "patient"
    }
  ];
  const { isPasswordVisible, handleTogglePassword } = useGeneralHook();

  return (
    <>
      <Input
        inputPlaceholder="Please enter  your name"
        id="name"
        inputType="text"
        {...register.name}
        error={errors.name?.message}
      />

      <Input
        inputPlaceholder="Please enter your phone number"
        id="phone"
        inputType="text"
        {...register.phoneNumber}
        error={errors.phoneNumber?.message}
      />
      <Input
        inputPlaceholder="Please enter your email"
        id="email"
        inputType="email"
        {...register.email}
        error={errors.email?.message}
      />
      <SelectInput
        options={options}
        onChange={onSelect}
        value={value}
        id="select"
      />
      <div className=" relative">
        <Input
          inputPlaceholder="Please enter your password"
          id="password"
          inputType={isPasswordVisible ? "text" : "password"}
          {...register.password}
          error={errors.password?.message}
        />
        <TogglePassword
          isVisable={isPasswordVisible}
          onClick={handleTogglePassword}
        />
      </div>
      <CheckBox {...register.checkBox} error={errors.checkBox?.message} />
    </>
  );
};

function Signup() {
  const { registerField, errors, handleSubmit, value, onSelect, isSubmitting } =
    useRegister();

  return (
    <div className="px-4">
      <CardLayout>
        <PageHeading
          title="Register Now"
          subTitle="Complete the form to create your account"
        />
        <form onSubmit={handleSubmit}>
          <FormInputs
            register={registerField}
            errors={errors}
            onSelect={onSelect}
            value={value}
          />

          <SignUpButton isSubmitting={isSubmitting} />
          <div className="mt-4">
            <GoogleInButton />
          </div>
          <AuthSwitch
            text="Already have an account?"
            linkText="Login"
            hreLink="/auth/login"
          />
        </form>
      </CardLayout>
    </div>
  );
}

export default Signup;
