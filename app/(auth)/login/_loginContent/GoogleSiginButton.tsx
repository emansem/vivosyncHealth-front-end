import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { FcGoogle } from "react-icons/fc";

export const GoogleSignInButton = () => {
  return (
    <PrimaryButton backgroud={false}>
      <div className="flex justify-center items-center gap-4">
        <span className="text-4xl">
          <FcGoogle />
        </span>
        <span className="font-[500] text-stone-500">Sign in with Google</span>
      </div>
    </PrimaryButton>
  );
};
