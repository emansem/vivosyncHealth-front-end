import AuthSwitch from "@/src/components/ui/auth/AuthSwitch";
import GoogleSIgnUpButton from "./GoogleSIgnUpButton";
import { SignUpButton } from "./SignUpButton";

function FormFooterPart({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <>
      <SignUpButton isSubmitting={isSubmitting} />
      <div className="mt-4">
        <GoogleSIgnUpButton />
      </div>
      <AuthSwitch
        text="Already have an account?"
        linkText="Login"
        hreLink="/auth/login"
      />
    </>
  );
}

export default FormFooterPart;
