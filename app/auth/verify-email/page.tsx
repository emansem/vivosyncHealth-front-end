"use client";
import { EMAIL_VERIFICATION_MESSAGE } from "@/app/lib/constant";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

import React from "react";

function VerifyEmail() {
  return <EmailVerifyWrapper message={EMAIL_VERIFICATION_MESSAGE} />;
}

export default VerifyEmail;
