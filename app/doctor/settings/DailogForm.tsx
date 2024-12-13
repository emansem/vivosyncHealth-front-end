import Input from "@/src/components/ui/forms/Input";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
import { Button } from "@/src/components/utils/Button";
import { Dialog } from "@/src/components/utils/Dialog";
import { ChangeEvent } from "react";

export interface InputsProps {
  label: string;
  type: "password" | "text" | "email";
  placeHolder: string;
  name: string;
}

// Password Dialog Component
interface DailogFormProps {
  isOpen: boolean;
  onClose: () => void;
  inputsFields: InputsProps[];
  onSubmit: () => void;
  title: string;
  isSubmitting: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const DailogForm = ({
  isOpen,
  onClose,
  inputsFields,
  onChange,
  isSubmitting,
  onSubmit,
  title
}: DailogFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputsFields.map((item) => (
          <Input
            onChange={onChange}
            key={item.name}
            inputType={item.type}
            label={item.label}
            inputPlaceholder={item.placeHolder}
            name={item.name}
          />
        ))}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            disabled={isSubmitting}
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isSubmitting ? <SubmittingLoader /> : "Update"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};
