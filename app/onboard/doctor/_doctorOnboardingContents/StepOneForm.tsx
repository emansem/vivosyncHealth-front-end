import { STEP_ONE_FORM_FIELDS } from "@/app/lib/constant";
import { useOnchangeDoctorOnboarding, useAppSelector } from "@/app/lib/hooks";
import { DoctorOnboardingForm } from "@/app/lib/redux/features/form/multipleStepFormSlice";
import { FormStepsStyles } from "@/src/components/utils/css/generalstyles";
import Input from "@/src/components/ui/forms/Input";

export const StepOneForm = () => {
  const { handleFormChange } = useOnchangeDoctorOnboarding();
  const { formData, errors } = useAppSelector((state) => state.doctorStep);
  console.log(formData);
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Practical information
      </div>
      <div>
        {STEP_ONE_FORM_FIELDS.map((field, index) => (
          <div className={FormStepsStyles.formStepsDev} key={index}>
            <Input
              name={field.name}
              inputType={field.type}
              inputPlaceholder={field.placeholder}
              // value={formData[field.name as keyof DoctorOnboardingForm]}
              onChange={handleFormChange}
              error={errors?.[field.name]}
            />
          </div>
        ))}
      </div>
    </>
  );
};
