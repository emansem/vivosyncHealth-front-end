"use client";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

import React from "react";

function VerifyEmail() {
  const EMAIL_VERIFICATION_MESSAGE = `We've sent a verification link to your email address. Please check your inbox and click the link to verify your account`;

  return <EmailVerifyWrapper message={EMAIL_VERIFICATION_MESSAGE} />;
}

export default VerifyEmail;
