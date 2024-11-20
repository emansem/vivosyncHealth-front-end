import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

//sing up button
export const SignUpButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
  return (
    <PrimaryButton backgroud={true} isSubmitting={isSubmitting}>
      <span className="font-[500] text-gray-100">
        {isSubmitting ? "Please wait..." : "Register"}
      </span>
    </PrimaryButton>
  );
};
