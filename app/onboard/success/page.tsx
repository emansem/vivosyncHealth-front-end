import { SuccessWrapperAlert } from "@/src/components/ui/alert/SuccessAlert";
import React from "react";

function SuccessOnboardPage() {
  const message =
    "Your profile is complete and verified. You can now access the dashboard.";
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
