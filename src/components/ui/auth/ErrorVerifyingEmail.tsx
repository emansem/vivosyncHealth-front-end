import { MailX } from "lucide-react";
import PrimaryButton from "../button/PrimaryButton";
import { CardLayout } from "../layout/CardLayout";
export interface ErrorVerifyingEmailProps {
  onClick: () => void;
  isLoading: boolean;
  buttonText: string;
}
export const ErrorVerifyingEmail = ({
  onClick,
  buttonText,
  isLoading
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
            <PrimaryButton
              isSubmitting={isLoading}
              onClick={onClick}
              color="text-white"
              backgroud
            >
              {buttonText}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};
