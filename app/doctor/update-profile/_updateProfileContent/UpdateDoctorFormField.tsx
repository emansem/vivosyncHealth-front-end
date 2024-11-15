import { DOCTOR_UPDATE_PROFILE_FIELDS } from "@/data/doctorUpdateProfileFields";
import Input from "@/src/components/ui/forms/Input";
import TextArea from "@/src/components/ui/forms/TextArea";
import React from "react";

function UpdateDoctorFormField() {
  return (
    <>
      <div className="grid md:grid-cols-2 md:gap-3">
        {DOCTOR_UPDATE_PROFILE_FIELDS.map((field) =>
          field.type === "textArea" ? (
            <TextArea
              key={field.name}
              id={field.name}
              textAreaLabel={field.label}
            />
          ) : (
            <Input
              key={field.name}
              name={field.name}
              id={field.name}
              label={field.label}
              inputType={field.type}
              inputPlaceholder={field.placeHolder}
            />
          )
        )}
      </div>
    </>
  );
}

export default UpdateDoctorFormField;
