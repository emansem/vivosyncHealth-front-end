import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import React from "react";

function page() {
  return (
    <div className="px-4">
      <CardLayout>
        <div>
          <PageHeading
            title="Forgot Password"
            subTitle="To reset your password, please enter your linked to your account"
          />
          <Input inputType="text" inputPlaceholder="Please enter your email" />
          <PrimaryButton backgroud color="text-white">
            Verify email
          </PrimaryButton>
        </div>
      </CardLayout>
    </div>
  );
}

export default page;
