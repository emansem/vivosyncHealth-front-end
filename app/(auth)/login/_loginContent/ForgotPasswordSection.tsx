import Link from "next/link";

function ForgotPasswordSection() {
  return (
    <div className="px-3 mb-4">
      <Link href="/auth/forgot-password">
        <span className="text-base md:text-[18px] text-secondary_color font-medium underline cursor-pointer hover:text-primary_color">
          Forgot password?
        </span>
      </Link>
    </div>
  );
}

export default ForgotPasswordSection;
