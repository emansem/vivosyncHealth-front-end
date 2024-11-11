"use client";
import SuccessEmailWrapper from "@/src/components/ui/auth/SuccessEmailWrapper";

function ResetPasswordSuccess() {
  return (
    <>
      <SuccessEmailWrapper
        message="Thank you for verifying your email address, you can now reset your
          password"
        buttonText="Reset password"
      />
    </>
  );
}

export default ResetPasswordSuccess;
