"use client";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

import React from "react";

function VerifyEmail() {
  return (
    <EmailVerifyWrapper
      message=" We've sent a verification link to your email address. Please check
            your inbox and click the link to your account"
    />
  );
}

export default VerifyEmail;
