/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useVerifyEmail } from "@/src/hooks/authentication/useVerifyUserEmail";
import { useResendLink } from "@/src/hooks/authentication/useResendToken";
import SuccessEmailWrapper from "@/src/components/ui/auth/SuccessEmailWrapper";
import { ErrorVerifyingEmail } from "@/src/components/ui/auth/ErrorVerifyingEmail";
import Link from "next/link";
import { WarningAlert } from "@/src/components/ui/alert/WarningAlert";
import { useSearchParams } from "next/navigation";
import React from "react";
import { TokenType } from "@/app/lib/types";

function VerifiedEmailSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  //token to send to the server
  const data: TokenType = {
    token: token
  };

  //custom hook to verify user email
  const { isLoading, hasTokenExpired, user_type, noUser, isUserEmailVerified } =
    useVerifyEmail(data);

  //custom hook to resend user email verification token
  const { handleResendEmail, isDisabled } = useResendLink(data);

  const buttonText = isDisabled ? "Wait 1 minute" : "Resend Link";
  const warningMessage =
    "No user found , please click the button bellow to create your account in just few steps";
  const userType = user_type === "doctor" && (
    <Link href="/onboard/doctor"> Complete your profile</Link>
  );

  if (isLoading) return <div>Loading...</div>;
  if (noUser) {
    return (
      <WarningAlert
        warningMessage={warningMessage}
        buttonText={<Link href="/auth/register"> Go to register</Link>}
      />
    );
  }
  if (!hasTokenExpired && isUserEmailVerified) {
    return (
      <SuccessEmailWrapper
        message="Thank you for verifying your email address. Your account is fully activated."
        buttonText={userType}
      />
    );
  }

  return (
    <ErrorVerifyingEmail
      isLoading={isDisabled}
      buttonText={buttonText}
      onClick={handleResendEmail}
    />
  );
}

export default VerifiedEmailSuccess;
