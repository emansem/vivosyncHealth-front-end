"use client";
import { ErrorVerifyingEmail } from "@/src/components/ui/auth/ErrorVerifyingEmail";
import SuccessEmailWrapper from "@/src/components/ui/auth/SuccessEmailWrapper";
import { useVerifyPasswordRestToken } from "@/src/hooks/authentication/useVerifyPasswordResetToken";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ResetPasswordSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const { isPending, handleResendEmail, isVerified, hasTokenExpired } =
    useVerifyPasswordRestToken({ token });
  // Added verifyToken to depen

  // Show loading state while verification is in progress

  if (!isVerified || isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <span>Verifying your reset password link...</span>
      </div>
    );
  }

  // Show error state if token has expired
  if (hasTokenExpired) {
    return (
      <ErrorVerifyingEmail
        onClick={handleResendEmail}
        buttonText="Resend Link"
        isLoading={isPending}
      />
    );
  }

  // Show success state with reset password link
  return (
    <SuccessEmailWrapper
      message="Thank you for verifying your email address, you can now reset your password"
      buttonText={
        <Link href={`/auth/reset-password-reset?token=${token}`}>
          Reset Password
        </Link>
      }
    />
  );
}

export default ResetPasswordSuccess;
