// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import { useVerifyEmail } from "@/src/hooks/authentication/useVerifyUserEmail";
// import SuccessEmailWrapper from "@/src/components/ui/auth/SuccessEmailWrapper";
// import Link from "next/link";
// import { WarningAlert } from "@/src/components/ui/alert/WarningAlert";
// import { useSearchParams } from "next/navigation";
// import React from "react";
// import { TokenType } from "@/app/lib/types";
// import { ErrorVerifyingEmail } from "@/src/components/ui/auth/ErrorVerifyingEmail";
// import { useResendLink } from "@/src/hooks/authentication/useResendToken";
// import { decodeEmail, encodeEmail } from "@/src/helper/email";

// function VerifiedEmailSuccess() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token") as string;

//   //token to send to the server
//   const data: TokenType = {
//     token: token
//   };

//   //custom hook to verify user email
//   const {
//     isLoading,
//     isPending,
//     hasTokenExpired,
//     isUserEmailVerified,
//     userEmail,
//     noUser
//   } = useVerifyEmail(data);
//   console.log(userEmail);

//   const { isDisabled, handleResendEmail } = useResendLink(userEmail);
//   const encordedEmailAddress = encodeEmail(userEmail);
//   console.log(encordedEmailAddress, decodeEmail(encordedEmailAddress));

//   //Check the user type if the user is a patient redirect to dashboard or ask the user to complet his profile
//   // const userType =
//   //   user_type === "doctor" ? (
//   //     <Link href="/onboard/doctor"> Complete your profile</Link>
//   //   ) : (
//   //     "Go to dashboard"
//   //   );

//   if (isLoading || isPending) {
//     return <div>Verifying email...</div>;
//   }

//   // If email verification token has expired, redirect to get a new token
//   if (hasTokenExpired && !isUserEmailVerified) {
//     window.location.href = `/auth/verify/failed?token=${encordedEmailAddress}`;
//     return;
//   }

//   //If there is no user found, show the a warning alert to create a new account
//   if (noUser) {
//     return (
//       <WarningAlert
//         warningMessage="No user found , please click the button below to create your account in just few steps"
//         buttonText={<Link href="/auth/register"> Go to register</Link>}
//       />
//     );
//   }

//   //If all is good and the user is a doctor, ask them to complet their account
//   return (
//     <SuccessEmailWrapper
//       message="Thank you for verifying your email address. Your account is fully activated."
//       buttonText={"Do to dashboard"}
//     />
//   );
// }

// export default VerifiedEmailSuccess;
