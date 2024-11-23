"use client";
import { EMAIL_SUBJECT, EMAIL_VERIFICATION_MESSAGES } from "@/app/lib/constant";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

function ResetPasswordSuccess() {
  return (
    <>
      <EmailVerifyWrapper
        email_subject={EMAIL_SUBJECT.RESET_PASSWORD}
        message={EMAIL_VERIFICATION_MESSAGES.friendly}
      />
    </>
  );
}

export default ResetPasswordSuccess;
