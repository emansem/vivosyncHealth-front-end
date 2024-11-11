"use client";

import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

function page() {
  return (
    <EmailVerifyWrapper message="To reset your password, we've sent a verification link to your email address." />
  );
}

export default page;
