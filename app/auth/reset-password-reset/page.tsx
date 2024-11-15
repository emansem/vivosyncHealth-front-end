import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import Input from "@/src/components/ui/forms/Input";
import React from "react";
import { PASSWORD_REST_FIELDS } from "@/app/lib/constant";

function page() {
  return (
    <div className="px-4">
      <CardLayout>
        <form>
          <PageHeading
            title="Reset Password"
            subTitle="Reset your password, please enter the new password below"
          />
          {PASSWORD_REST_FIELDS.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              inputType={field.type}
              inputPlaceholder={field.placeHolder}
              id={field.name}
            />
          ))}

          <PrimaryButton backgroud children="Confirm" color="text-white" />
        </form>
      </CardLayout>
    </div>
  );
}

export default page;
