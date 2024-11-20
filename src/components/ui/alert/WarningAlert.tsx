import { AlertProps } from "@/app/lib/types";
import { CircleAlert } from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import { CardLayout } from "../layout/CardLayout";

export const WarningAlert = ({
  warningMessage,
  buttonText,
  onClick
}: AlertProps) => {
  return (
    <CardLayout>
      <div className="flex flex-col gap-3 md:gap-6">
        <div className="flex items-center  justify-center h-18 p-3 bg-red-600/10 self-center w-18 rounded-full">
          <CircleAlert size={38} color="#dc2626" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <p className="text-base text-text_color2 ">{warningMessage}</p>
        </div>

        <div>
          <PrimaryButton onClick={onClick} color="text-white" backgroud>
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </CardLayout>
  );
};
