import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import Input from "@/src/components/ui/forms/Input";
import React from "react";

function page() {
  return (
    <div className="px-4">
      <CardLayout>
        <div>
          <PageHeading
            title="Reset Password"
            subTitle="Reset your password, please enter the new password below"
          />
          <Input
            inputType="password"
            inputPlaceholder="Enter your new password"
          />
          <Input
            inputType="text"
            inputPlaceholder="Confirm your  new password"
          />
          <PrimaryButton backgroud children="Confirm" color="text-white" />
        </div>
      </CardLayout>
    </div>
  );
}

export default page;
