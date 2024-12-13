import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";

export const SignInButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <PrimaryButton backgroud={true} isSubmitting={isSubmitting}>
      <span className="font-[500] text-gray-100">
        {isSubmitting ? <SubmittingLoader text="Please wait..." /> : "Login"}
      </span>
    </PrimaryButton>
  );
};
