"use client";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { LogInForm } from "./_loginContent/LogInForm";

function LoginPage() {
  return (
    <div className="px-4 md:px-0">
      <CardLayout>
        <PageHeading
          title="Welcome Back"
          subTitle="Please enter your details"
        />
        <LogInForm />
      </CardLayout>
    </div>
  );
}

export default LoginPage;
