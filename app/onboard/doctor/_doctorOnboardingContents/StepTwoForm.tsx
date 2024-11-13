import { STEP_TWO_FORM_FIELDS } from "@/app/lib/constant";
import { useAppSelector, useOnchangeDoctorOnboarding } from "@/app/lib/hooks";
import Input from "@/src/components/ui/forms/Input";
import { FormStepsStyles } from "@/src/components/utils/css/generalstyles";

export const StepTwoForm = () => {
  const { formData, errors } = useAppSelector((state) => state.doctorStep);
  const { handleFormChange } = useOnchangeDoctorOnboarding();
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Address and Working days
      </div>
      <div>
        {STEP_TWO_FORM_FIELDS.map((field, index) => (
          <div key={index} className={FormStepsStyles.formStepsDev}>
            <Input
              onChange={handleFormChange}
              name={field.name}
              value={formData[field.name]}
              inputType={field.type}
              error={errors?.[field.name]}
              inputPlaceholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </>
  );
};
