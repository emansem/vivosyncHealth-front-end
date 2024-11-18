import { SuccessWrapperAlert } from "@/src/components/ui/auth/SuccessEmailWrapper";
import React from "react";

function SuccessOnboardPage() {
  const message =
    "Profile Complete Your account is now fully active and ready to use.";
  return (
    <>
      <SuccessWrapperAlert
        buttonText="Go To Dashboard"
        warningMessage={message}
      />
    </>
  );
}

export default SuccessOnboardPage;
