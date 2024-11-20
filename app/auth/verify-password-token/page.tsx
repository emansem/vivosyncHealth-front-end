"use client";
import SuccessEmailWrapper, {
  ErrorVerifyingEmail
} from "@/src/components/ui/auth/SuccessEmailWrapper";
import { useVerifyPasswordRestToken } from "@/src/hooks/serviceHook";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function ResetPasswordSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isVerified, setIsVerified] = useState(false);

  const { verifyToken, hasTokenExpired } = useVerifyPasswordRestToken();

  useEffect(() => {
    // Only proceed if token exists
    if (!token) return;

    verifyToken.mutate(token, {
      onSuccess: () => {
        setIsVerified(true);
        // // toast.success(
        // //   "Thank you for verifying your email address, you can now reset your password"
        // // );
        // // Store token in URL params when redirecting
        window.location.href = `http://localhost:3000/auth/reset-password-reset?token=${token}`;
      },
      onError: () => {
        setIsVerified(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]); // Added verifyToken to dependency array

  const onClick = () => console.log("hello world");

  // Show loading state while verification is in progress

  if (!isVerified || verifyToken.isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <span>Verifying your reset password link...</span>
      </div>
    );
  }

  // Show error state if token has expired
  if (hasTokenExpired) {
    return <ErrorVerifyingEmail onClick={onClick} buttonText="Resend Link" />;
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
