"use client";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import RegisterForm from "./_registerFormContent/RegisterForm";

function Signup() {
  return (
    <div className="px-4">
      <CardLayout>
        <PageHeading
          title="Register Now"
          subTitle="Complete the form to create your account"
        />
        <RegisterForm />
      </CardLayout>
    </div>
  );
}

export default Signup;
