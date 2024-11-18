import {
  useAppDispatch,
  useMultipleFormValidation,
  useAppSelector
} from "@/app/lib/hooks";
import {
  nextStep,
  prevStep
} from "@/app/lib/redux/features/form/multipleStepFormSlice";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { InnerCardLayout } from "@/src/components/ui/layout/CardLayout";
import { RenderForm } from "./RenderForm";
import { TOTAL_FORM_STEPS } from "@/app/lib/constant";
import { DisableButton } from "@/src/components/ui/button/DisableButton";
import { useupdatedOnboardingData } from "@/src/hooks/serviceHook";
import toast from "react-hot-toast";
import { get, request } from "http";

export const StepFormLayout = () => {
  const dispatch = useAppDispatch();
  const { validateStepOneForm, validateStepTwoForm } =
    useMultipleFormValidation();
  const { currentStep, formData } = useAppSelector((state) => state.doctorStep);
  const apiEndpoint = "/doctors/onboard";
  const { updateOnboardData } = useupdatedOnboardingData(apiEndpoint);

  const handleNext = () => {
    switch (currentStep) {
      case 1:
        const isFormOneValid = validateStepOneForm();
        if (!isFormOneValid) return;
        dispatch(nextStep());
      case 2:
        const isValid = validateStepTwoForm();
        if (!isValid) return;
        dispatch(nextStep());

      default:
        break;
    }
  };
  const handlePrevStep = () => {
    dispatch(prevStep());
  };
  const submitForm = () => {
    const { profile_photo, about, languages } = formData;
    if (profile_photo === "" || about === "" || languages === "") {
      toast.error("Please fill all the fields");
      return;
    }
    updateOnboardData.mutate(formData, {
      onSuccess() {
        toast.success("Account successfully updated");
        window.location.href = `${window.location.protocol}://${window.location.hostname}/onboard/success`;
      }
    });
  };
  // console.log(formData);
  const isPending = updateOnboardData.isPending;
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
              onClick={submitForm}
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
