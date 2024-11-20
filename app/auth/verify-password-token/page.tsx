"use client";
import SuccessEmailWrapper, {
  ErrorVerifyingEmail
} from "@/src/components/ui/auth/SuccessEmailWrapper";
import { useVerifyPasswordRestToken } from "@/src/hooks/serviceHook";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function ResetPasswordSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;

  const { verifyToken, hasTokenExpired } = useVerifyPasswordRestToken();

  useEffect(() => {
    if (token) {
      verifyToken.mutate(token, {
        onSuccess: () => {
          window.location.href = `${window.location.protocol}//${window.location.hostname}/auth/reset-password-reset`;
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onClick = () => console.log("hello world");
  if (verifyToken.isPending) return <div>loading</div>;
  const resetPasswordLink = (
    <Link href={`auth/reset-password-reset?${token}`}>Reset Password</Link>
  );
  return (
    <>
      {hasTokenExpired ? (
        <ErrorVerifyingEmail onClick={onClick} buttonText={"Resend Link"} />
      ) : (
        <SuccessEmailWrapper
          message="Thank you for verifying your email address, you can now reset your
          password"
          buttonText={resetPasswordLink}
        />
      )}
    </>
  );
}

export default ResetPasswordSuccess;
