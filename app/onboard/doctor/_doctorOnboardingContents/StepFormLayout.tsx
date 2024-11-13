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

export const StepFormLayout = () => {
  const dispatch = useAppDispatch();
  const { validateStepOneForm, validateStepTwoForm } =
    useMultipleFormValidation();
  const { currentStep } = useAppSelector((state) => state.doctorStep);

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
  return (
    <>
      <InnerCardLayout>
        <RenderForm />
      </InnerCardLayout>
      <div className="flex justify-between my-6">
        <div onClick={handlePrevStep} className=" w-36 md:w-48">
          <PrimaryButton backgroud={false}>Back</PrimaryButton>
        </div>
        <div onClick={handleNext} className=" w-36 md:w-48">
          <PrimaryButton backgroud color="text-white">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
