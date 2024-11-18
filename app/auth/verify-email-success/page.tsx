/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useResendLink, useVerifyEmail } from "@/app/lib/hooks";
import SuccessEmailWrapper, {
  ErrorVerifyingEmail,
  WarningAlert
} from "@/src/components/ui/auth/SuccessEmailWrapper";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import React from "react";

function VerifiedEmailSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { isLoading, hasTokenExpired, user_type, noUser, isUserEmailVerified } =
    useVerifyEmail(token);
  const { handleClick, isDisabled } = useResendLink(token);

  if (isLoading) return <div>Loading...</div>;
  const buttonText = isDisabled ? "Wait 1 minute" : "Resend Link";
  const warningMessage =
    "No user found , please click the button bellow to create your account in just few steps";
  const userType =
    user_type === "doctor" ? (
      <Link href="/onboard/doctor"> Complete your profile</Link>
    ) : (
      ""
    );
  return (
    <>
      {noUser ? (
        <WarningAlert
          warningMessage={warningMessage}
          buttonText="Go to register"
        />
      ) : !hasTokenExpired && isUserEmailVerified ? (
        <SuccessEmailWrapper
          message="Thank you for verifying your email address. Your account is fully activated."
          buttonText={userType}
        />
      ) : (
        <ErrorVerifyingEmail buttonText={buttonText} onClick={handleClick} />
      )}
    </>
  );
}

export default VerifiedEmailSuccess;
