import { useAppSelector } from "@/app/lib/hooks";
import { StepOneForm } from "./StepOneForm";
import { StepThreeForm } from "./StepThreeForm";
import { StepTwoForm } from "./StepTwoForm";

export const RenderForm = () => {
  const { currentStep } = useAppSelector((state) => state.doctorStep);
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return <StepOneForm />;
      case 2:
        return <StepTwoForm />;
      case 3:
        return <StepThreeForm />;
      default:
        return null;
    }
  };

  return <>{renderStepForm()}</>;
};
