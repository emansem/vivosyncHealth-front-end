"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import Input from "@/src/components/ui/forms/Input";
import React from "react";
import { PASSWORD_REST_FIELDS } from "@/app/lib/constant";
import { useResetPassword } from "@/app/lib/hooks";

function page() {
  const { handleOnChange, handleSubmit } = useResetPassword();
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

        <PrimaryButton onClick={handleSubmit} backgroud color="text-white">
          Confirm
        </PrimaryButton>
      </CardLayout>
    </div>
  );
}

export default page;
