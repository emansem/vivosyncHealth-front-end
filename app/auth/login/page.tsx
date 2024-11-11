"use client";
import AuthSwitch from "@/src/components/ui/auth/AuthSwitch";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { FcGoogle } from "react-icons/fc";
import useLoginForm from "@/src/hooks/useLoginForm";
import { UseFormRegisterReturn } from "react-hook-form";
import { TogglePassword } from "@/src/components/utils/PasswordToggle";
import useGeneralHook from "@/src/hooks/useGeneralHook";

interface FormInputsProps {
  register: {
    email: UseFormRegisterReturn;
    password: UseFormRegisterReturn;
  };
  errors: {
    email?: { message: string };
    password?: { message: string };
  };
}

//sing in button
const SignButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <PrimaryButton backgroud={true} isSubmitting={isSubmitting}>
      <span className="font-[500] text-gray-100">
        {isSubmitting ? "Loading..." : "Login"}
      </span>
    </PrimaryButton>
  );
};
//Password forgotten link
const ForgotPassword = () => {
  return (
    <div className="px-3 mb-4">
      <a
        className="text-base md:text-[18px] text-secondary_color font-medium underline cursor-pointer hover:text-primary_color"
        href=""
      >
        Forgot password?
      </a>
    </div>
  );
};

const GoogleInButton = () => {
  return (
    <PrimaryButton backgroud={false}>
      <div className="flex justify-center items-center gap-4">
        <span className="text-4xl">
          <FcGoogle />
        </span>
        <span className="font-[500] text-stone-500">Sign in with Google</span>
      </div>
    </PrimaryButton>
  );
};

//Form inputs to submit
const FormInputs = ({ register, errors }: FormInputsProps | any) => {
  const { isPasswordVisible, handleTogglePassword } = useGeneralHook();
  return (
    <>
      <Input
        inputPlaceholder="Please enter your email"
        id="email"
        inputType="email"
        {...register.email}
        error={errors.email?.message}
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

      <div className="my-6"></div>
    </>
  );
};

function LoginPage() {
  const { registerField, errors, handleSubmit, isSubmitting } = useLoginForm();

  return (
    <div className="px-4 md:px-0">
      <CardLayout>
        <PageHeading
          title="Welcome Back"
          subTitle="Please enter your details"
        />
        <form onSubmit={handleSubmit}>
          <FormInputs register={registerField} errors={errors} />
          <ForgotPassword />
          <SignButton isSubmitting={isSubmitting} />
          <div className="mt-4">
            <GoogleInButton />
          </div>
          <AuthSwitch
            text="Dont't have an account?"
            linkText="Signup"
            hreLink="/auth/register"
          />
        </form>
      </CardLayout>
    </div>
  );
}

export default LoginPage;
