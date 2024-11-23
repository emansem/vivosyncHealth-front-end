import React from "react";
import ForgotPasswordSection from "./ForgotPasswordSection";
import { SignInButton } from "./SiginButton";
import { GoogleSignInButton } from "./GoogleSiginButton";
import AuthSwitch from "@/src/components/ui/auth/AuthSwitch";

function LoginFormFooterSection({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <>
      <ForgotPasswordSection />
      <SignInButton isSubmitting={isSubmitting} />
      <div className="mt-4">
        <GoogleSignInButton />
      </div>
      <AuthSwitch
        text="Dont't have an account?"
        linkText="Signup"
        hreLink="/auth/register"
      />
    </>
  );
}

export default LoginFormFooterSection;
