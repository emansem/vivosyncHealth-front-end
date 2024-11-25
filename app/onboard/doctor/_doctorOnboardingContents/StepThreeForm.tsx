import { primary_color } from "@/app/lib/constant";
import { useAppDispatch, useUPloadImage } from "@/app/lib/hooks";
import { useOnchangeDoctorOnboarding } from "@/src/hooks/authentication/useDoctorOnboard";
import {
  updateFormData,
  DoctorOnboardingForm
} from "@/app/lib/redux/features/form/multipleStepFormSlice";
import TextArea from "@/src/components/ui/forms/TextArea";
import { FormStepsStyles } from "@/src/components/utils/css/generalstyles";
import { Upload } from "lucide-react";
import Input from "@/src/components/ui/forms/Input";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/lib/service/uploadImage";
export const StepThreeForm = () => {
  const { handleFormChange } = useOnchangeDoctorOnboarding();
  // console.log(formData);
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Write something about yourself
      </div>
      <div>
        <div className={FormStepsStyles.formStepsDev}>
          <TextArea
            onChange={handleFormChange}
            name="about"
            // value={formData.about}
            id="about"
          />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            name="languages"
            onChange={handleFormChange}
            // value={formData.languages}
            inputType="text"
            inputPlaceholder="Languages Exp: French, English"
          />
        </div>
        <UploadProfilePicture />
      </div>
    </>
  );
};

const UploadProfilePicture = () => {
  const dispatch = useAppDispatch();
  const { handlePhotoChange, image, previewImage } = useUPloadImage();

  dispatch(
    updateFormData({
      field: "profile_photo" as keyof DoctorOnboardingForm,
      value: image
    })
  );

  return (
    <div>
      <div className="border-dotted border-2 flex justify-center items-center rounded-md border-gray-300 w-full h-40">
        <label className="flex items-center gap-2 flex-col" htmlFor="profile">
          <Upload size={40} color={primary_color} />
          <div className="flex flex-col text-center gap-1">
            <span className="text-base text-text_color2 font-medium">
              Upload a professional profile photo
            </span>
            <span className="text-xs text-text_color1">
              Drag and drop file here or click to upload
            </span>
          </div>
        </label>
        <input
          required
          name="profile_photo"
          onChange={handlePhotoChange}
          accept="image/*"
          hidden
          multiple={false}
          id="profile"
          type="file"
        />
      </div>
      {previewImage && (
        <div className="relative cursor-pointer h-[200px] md:h-[250px] w-full md:w-[300px] mt-2 rounded-md overflow-hidden">
          <Image
            src={previewImage}
            alt="Profile preview"
            fill
            sizes="70px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};
