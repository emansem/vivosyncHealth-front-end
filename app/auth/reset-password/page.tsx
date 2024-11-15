"use client";

import { PASSWORD_RESET_MESSAGE } from "@/app/lib/constant";
import EmailVerifyWrapper from "@/src/components/ui/auth/EmailVerifyWrapper";

function page() {
  return <EmailVerifyWrapper message={PASSWORD_RESET_MESSAGE} />;
}

export default page;
