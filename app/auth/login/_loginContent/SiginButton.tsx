import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

export const SignInButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <PrimaryButton backgroud={true} isSubmitting={isSubmitting}>
      <span className="font-[500] text-gray-100">
        {isSubmitting ? "Loading..." : "Login"}
      </span>
    </PrimaryButton>
  );
};
