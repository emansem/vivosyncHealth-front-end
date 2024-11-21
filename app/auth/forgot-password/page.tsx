"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { useForgotPassword } from "@/src/hooks/authentication/useForgotPassword";

function Page() {
  const { handleSubmitForgotPasswordForm, isPending, getUserEmailAddress } =
    useForgotPassword();
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
              onClick={handleSubmitForgotPasswordForm}
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
