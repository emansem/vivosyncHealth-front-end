"use client";
import { Mail } from "lucide-react";
import React from "react";
import { CardLayout } from "../layout/CardLayout";
import { VerifyEmailProps } from "@/src/types/general";
import { useResendLink } from "@/src/hooks/authentication/useResendToken";
import PrimaryButton from "../button/PrimaryButton";

export function EmailVerifyWrapper({ message }: VerifyEmailProps) {
  const { handleResendEmail, isDisabled } = useResendLink();
  return (
    <div className="px-4">
      <CardLayout>
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex items-center justify-center h-18 p-3 bg-light_color self-center w-18 rounded-full">
            <Mail size={38} color=" #269c65" />
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-stone-800  capitaliz font-semibold  text-xl md:text-3xl ">
              Verify your Email
            </h1>
            <p className="text-base text-text_color2 ">{message}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg font-medium border-red-200 border  text-red-700  text-sm">
            <p>
              Didn&apos;t receive the email? Check your spam folder, or click
              the button below to resend a link
            </p>
          </div>
          <div>
            <PrimaryButton
              isSubmitting={isDisabled}
              onClick={handleResendEmail}
              color="text-white"
              backgroud
            >
              {isDisabled ? "Please wait 1 minute.." : " Resend link"}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}

export default EmailVerifyWrapper;
