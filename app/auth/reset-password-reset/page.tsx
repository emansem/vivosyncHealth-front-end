/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import Input from "@/src/components/ui/forms/Input";
import React from "react";
import { useSearchParams } from "next/navigation";

import { PASSWORD_REST_FIELDS } from "@/app/lib/constant";
import { useResetPassword } from "@/app/lib/hooks";

function PasswordResentPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { handleOnChange, isPending, handleSubmit } = useResetPassword(token);
  return (
    <div className="px-4">
      <CardLayout>
        <PageHeading
          title="Reset Password"
          subTitle="Reset your password, please enter the new password below"
        />
        {PASSWORD_REST_FIELDS.map((field) => (
          <Input
            onChange={handleOnChange}
            key={field.name}
            name={field.name}
            inputType={field.type}
            inputPlaceholder={field.placeHolder}
            id={field.name}
          />
        ))}

        <div className="pt-4">
          <PrimaryButton
            isSubmitting={isPending}
            onClick={handleSubmit}
            backgroud
            color="text-white"
          >
            {isPending ? "Please wait..." : "Confirm"}
          </PrimaryButton>
        </div>
      </CardLayout>
    </div>
  );
}

export default PasswordResentPage;
