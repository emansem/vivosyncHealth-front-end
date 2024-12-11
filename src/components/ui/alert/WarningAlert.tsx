import { AlertProps } from "@/app/lib/types";
import { AlertCircle, CircleAlert } from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import { CardLayout } from "../layout/CardLayout";
import { useOpenAndClose } from "@/app/lib/hooks";

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
interface WarningAlertProps {
  handleConfirmButton: () => void;
  handleClose: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

export const GlobalWarningAlert = ({
  handleClose,
  isOpen = false,
  isLoading = false,
  handleConfirmButton
}: WarningAlertProps) => {
  const cursorPointer = isLoading ? "cursor-not-allowed" : "cursor-pointer";
  return (
    <div className={` fixed z-40 transperentBg inset-0 ${!isOpen && "hidden"}`}>
      <CardLayout>
        <div className="flex flex-col item-center text-center gap-2">
          <div className="flex items-center  justify-center h-18 p-3 bg-red-600/10 self-center w-18 rounded-full">
            <AlertCircle size={38} color="#dc2626" />
          </div>
          <div className="w-full flex text-center item-center flex-col  ">
            <p className=" text-lg md:text-xl pb-2  text-stone-700 font-medium">
              You are about to delet this plan
            </p>
            <p className=" text-sm md:text-base text-text_color2">
              Are you sure you want to delete this plan? <br></br>This Action
              cannot be undone
            </p>
          </div>

          <div className="flex pt-4  justify-center gap-3 items-center">
            <span
              onClick={handleClose}
              className="bg-red-600/10 text-red-500 cursor-pointer text-base py-2 px-6 rounded-md"
            >
              Close
            </span>
            <button
              disabled={isLoading}
              onClick={handleConfirmButton}
              className={`bg-primary_color text-white 
             hover:bg-secondary_color transition-all
              duration-200 ease-linear font-medium text-base ${cursorPointer} py-2 px-6 rounded-md`}
            >
              {isLoading ? "Please wait.." : "Confirm"}
            </button>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};
