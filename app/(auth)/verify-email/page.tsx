"use client";
import { EMAIL_SUBJECT, EMAIL_VERIFICATION_MESSAGES } from "@/app/lib/constant";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

import React from "react";

function VerifyEmail() {
  return (
    <EmailVerifyWrapper
      email_subject={EMAIL_SUBJECT.VERIFY_EMAIL}
      message={EMAIL_VERIFICATION_MESSAGES.standard}
    />
  );
}

export default VerifyEmail;
