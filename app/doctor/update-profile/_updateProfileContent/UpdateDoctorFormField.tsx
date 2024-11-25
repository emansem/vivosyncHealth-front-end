import { DOCTOR_UPDATE_PROFILE_FIELDS } from "@/data/doctorUpdateProfileFields";
import Input from "@/src/components/ui/forms/Input";
import TextArea from "@/src/components/ui/forms/TextArea";
import { useUpdateDoctorProfile } from "@/src/hooks/useDoctorProfile";
import React from "react";

function UpdateDoctorFormField() {
  const { profileData, updateProfileField } = useUpdateDoctorProfile();

  return (
    <>
      <div className="grid  md:gap-3">
        {DOCTOR_UPDATE_PROFILE_FIELDS.map((field) =>
          field.type === "textArea" ? (
            <TextArea
              key={field.name}
              id={field.name}
              value={profileData[field.name]}
              onChange={updateProfileField}
              textAreaLabel={field.label}
            />
          ) : (
            <Input
              key={field.name}
              name={field.name}
              id={field.name}
              label={field.label}
              onChange={updateProfileField}
              value={profileData[field.name]}
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
