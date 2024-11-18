import {
  Check,
  CircleAlert,
  CircleCheckBig,
  MailCheck,
  MailX
} from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import { CardLayout } from "../layout/CardLayout";
import { VerifyEmailProps } from "@/src/types/general";

function SuccessEmailWrapper({ message, buttonText }: VerifyEmailProps) {
  return (
    <div className="px-4">
      <CardLayout>
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex items-center justify-center h-18 p-3 bg-light_color self-center w-18 rounded-full">
            <MailCheck size={38} color=" #269c65" />
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-secondary_color capitaliz font-semibold  text-xl md:text-3xl ">
              Email Verified!
            </h1>
            <p className="text-base text-text_color2 ">{message}</p>
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

interface ErrorVerifyingEmailProps {
  onClick: () => void;
  buttonText: string;
}
export const ErrorVerifyingEmail = ({
  onClick,
  buttonText
}: ErrorVerifyingEmailProps) => {
  return (
    <div className="px-4">
      <CardLayout>
        <div className="flex flex-col gap-3 md:gap-6">
          <div className="flex items-center  justify-center h-18 p-3 bg-red-600/10 self-center w-18 rounded-full">
            <MailX size={38} color="#dc2626" />
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-red-500 capitaliz font-semibold  text-xl md:text-3xl ">
              Email verification failed
            </h1>
            <p className="text-base text-text_color2 ">
              Your email verification token has expired, please click the button
              below to request a new token
            </p>
          </div>

          <div>
            <PrimaryButton onClick={onClick} color="text-white" backgroud>
              {buttonText}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};

export default SuccessEmailWrapper;
interface AlertProps {
  warningMessage: string;
  buttonText: string;
  onClick?: () => void;
}

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
