import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { InnerCardLayout } from "@/src/components/ui/layout/CardLayout";
import { RenderForm } from "./RenderForm";
import { TOTAL_FORM_STEPS } from "@/app/lib/constant";
import { DisableButton } from "@/src/components/ui/button/DisableButton";
import {
  useUpdatedOnboardingData,
  useMultipleFormValidation
} from "@/src/hooks/authentication/useDoctorOnboard";

export const StepFormLayout = () => {
  const { handleNext, currentStep, handlePrevStep } =
    useMultipleFormValidation();
  const apiEndpoint = "/doctors/onboard";
  const { isPending, handleSubmitDoctorOnboardData } =
    useUpdatedOnboardingData(apiEndpoint);

  return (
    <>
      <InnerCardLayout>
        <RenderForm />
      </InnerCardLayout>
      <div className="flex justify-between my-6">
        <div onClick={handlePrevStep} className=" w-36 md:w-48">
          {currentStep > 1 ? (
            <PrimaryButton backgroud color="text-white">
              Back
            </PrimaryButton>
          ) : (
            <DisableButton>Back</DisableButton>
          )}
        </div>
        <div onClick={handleNext} className=" w-36 md:w-48">
          {currentStep < TOTAL_FORM_STEPS ? (
            <PrimaryButton backgroud color="text-white">
              Continue
            </PrimaryButton>
          ) : (
            <PrimaryButton
              isSubmitting={isPending}
              onClick={handleSubmitDoctorOnboardData}
              backgroud
              color="text-white"
            >
              {isPending ? "Saving.." : "Submit"}
            </PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};
