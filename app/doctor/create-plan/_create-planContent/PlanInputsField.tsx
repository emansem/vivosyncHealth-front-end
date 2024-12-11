import { SUBSCRIPTION_PLAN_INPUTS_FIELD } from "@/app/lib/constant";
import Input from "@/src/components/ui/forms/Input";
import { ChangeEvent } from "react";
interface PlanInputsFieldProps {
  handleOnchangePlanInputsField: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  value?: string;
}
function PlanInputsField({
  handleOnchangePlanInputsField,
  errorMessage,
  value
}: PlanInputsFieldProps) {
  return (
    <div>
      {SUBSCRIPTION_PLAN_INPUTS_FIELD.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          inputType={field.type}
          error={errorMessage}
          value={value}
          onChange={handleOnchangePlanInputsField}
          name={field.name}
          inputPlaceholder={field.placeHolder}
        />
      ))}
    </div>
  );
}

export default PlanInputsField;
