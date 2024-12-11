"use client";
import { Mail } from "lucide-react";
import React, { ChangeEvent, KeyboardEventHandler, useState } from "react";
import { CardLayout } from "../layout/CardLayout";
import { VerifyEmailProps } from "@/src/types/general";
// import { useResendLink } from "@/src/hooks/authentication/useResendToken";
import PrimaryButton from "../button/PrimaryButton";
import Input from "../forms/Input";
import { useVerifyEmail } from "@/src/hooks/authentication/useVerifyUserEmail";
import { EMAIL_SUBJECT } from "@/app/lib/constant";
import { useResendLink } from "@/src/hooks/authentication/useResendToken";

export function EmailVerifyWrapper({
  message,
  email_subject
}: VerifyEmailProps) {
  const {
    handleCodeOnchange,
    submitVerificationCode,
    isPending,
    handleKeyDown,
    isloading,
    codes
  } = useVerifyEmail(email_subject as string);

  const { handleResendEmail, isDisabled, timeLeft } = useResendLink(
    email_subject as string
  );
  if (isloading) return <div>loading.....</div>;

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
          <div className="flex justify-center gap-3">
            {codes.map((code, index) => (
              <div className="w-14 h-14" key={index}>
                <Input
                  onChange={(e) => handleCodeOnchange(e, index)}
                  key={index}
                  value={code}
                  onKeyEvent={(e) => handleKeyDown(e, index)}
                  name={`code-${index}`}
                  inputType="text"
                />
              </div>
            ))}
          </div>
          <div>
            <PrimaryButton
              isSubmitting={isPending}
              onClick={submitVerificationCode}
              color="text-white"
              backgroud
            >
              {isPending ? "Verifying..." : "Verify"}
            </PrimaryButton>
          </div>

          <div className=" flex flex-col items-center text-center gap-2 rounded-lg font-medium   text-sm">
            <p className=" textt-sm md:text-base text-text_color2">
              Didn&apos;t receive the email? Request a new code
            </p>
            <button
              disabled={isDisabled}
              onClick={handleResendEmail}
              className={`text-secondary_color  hover:text-primary_color transition-all duration-200 ease-lineartext-sm md:text-base  ${
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isDisabled ? `Send gain in ${timeLeft}` : " Resend Code"}
            </button>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}

export default EmailVerifyWrapper;
