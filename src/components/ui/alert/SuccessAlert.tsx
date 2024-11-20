import { AlertProps } from "@/app/lib/types";
import { CircleCheckBig } from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import { CardLayout } from "../layout/CardLayout";

export function SuccessWrapperAlert({
  warningMessage,
  buttonText
}: AlertProps) {
  return (
    <div className="px-4">
      <CardLayout>
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex items-center justify-center h-18 p-3 bg-light_color self-center w-18 rounded-full">
            <CircleCheckBig size={38} color=" #269c65" />
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-secondary_color capitaliz font-semibold  text-xl md:text-3xl ">
              Congratulations! 🎉
            </h1>
            <p className="text-base text-text_color2 ">{warningMessage}</p>
          </div>

          <div>
            <PrimaryButton color="text-white" backgroud>
              {buttonText}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}
