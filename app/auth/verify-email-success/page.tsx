import SuccessEmailWrapper from "@/src/components/ui/auth/SuccessEmailWrapper";
import React from "react";

function VerifiedEmailSuccess() {
  return (
    <>
      <SuccessEmailWrapper
        message="Thank you for verifying your email address. Your account is fully activated."
        buttonText="Go to Dashboard"
      />
    </>
  );
}

export default VerifiedEmailSuccess;
