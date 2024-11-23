import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

import { FcGoogle } from "react-icons/fc";

function GoogleSIgnUpButton() {
  return (
    <PrimaryButton backgroud={false}>
      <div className="flex justify-center items-center gap-4">
        <span className="text-3xl">
          <FcGoogle />
        </span>
        <span className="font-[500] text-stone-500">Sign up with Google</span>
      </div>
    </PrimaryButton>
  );
}

export default GoogleSIgnUpButton;
