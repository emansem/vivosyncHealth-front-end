"use client";
import { ErrorVerifyingEmail } from "@/src/components/ui/auth/ErrorVerifyingEmail";
import { useResendLink } from "@/src/hooks/authentication/useResendToken";
import React from "react";

function EmailVerificationFaild() {
  const { handleResendEmail, isDisabled } = useResendLink();
  const buttonText = isDisabled ? "Wait 1 minute" : "Resend Link";
  return (
    <ErrorVerifyingEmail
      isLoading={isDisabled}
      buttonText={buttonText}
      onClick={handleResendEmail}
    />
  );
}

export default EmailVerificationFaild;
