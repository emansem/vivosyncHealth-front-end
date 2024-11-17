"use client";
import { useResendLink } from "@/app/lib/hooks";
import { updateData } from "@/service/updateData";
import SuccessEmailWrapper, {
  ErrorVerifyingEmail
} from "@/src/components/ui/auth/SuccessEmailWrapper";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface UpdatedData {
  token: string;
}

function VerifiedEmailSuccess() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("");
  const token = searchParams.get("token");
  console.log("Token:", token);

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        const data = { token: token };
        const updatedData = await updateData<UpdatedData>({ data });
        const { status } = updatedData;
        setStatus(status);
      }
    };

    verifyToken();
  }, [token]);

  const { handleClick } = useResendLink(token as string);
  return (
    <>
      {status === "Error" ? (
        <ErrorVerifyingEmail onClick={handleClick} />
      ) : (
        <SuccessEmailWrapper
          message="Thank you for verifying your email address. Your account is fully activated."
          buttonText="Go to Dashboard"
        />
      )}
    </>
  );
}

export default VerifiedEmailSuccess;
