"use client";
import { useForgotPassword } from "@/app/lib/hooks";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";

import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useForgotPassword();
  const isPending = forgotPassword.isPending;
  const getUserEmailAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
  };
  const handleSubmit = () => {
    if (!email || !email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      return toast.error("Please provide a valid email");
    }
    forgotPassword.mutate(email, {
      onError: (error) => {
        console.log("error", error);
      }
    });
  };
  return (
    <div className="px-4">
      <CardLayout>
        <div>
          <PageHeading
            title="Forgot Password"
            subTitle="To reset your password, please enter your linked to your account"
          />
          <Input
            onChange={getUserEmailAddress}
            inputType="text"
            inputPlaceholder="Please enter your email"
          />
          <div className="pt-3">
            <PrimaryButton
              isSubmitting={isPending}
              onClick={handleSubmit}
              backgroud
              color="text-white"
            >
              {isPending ? "Sending.." : "  Verify email"}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}

export default Page;
