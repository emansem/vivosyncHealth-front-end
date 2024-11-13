"use client";
import {
  FORM_FIELDS,
  primary_color,
  TOTAL_FORM_STEPS
} from "@/app/lib/constant";
import {
  useAppDispatch,
  useAppSelector,
  useMultipleStepForm
} from "@/app/lib/hooks";
import {
  DoctorOnboardingForm,
  nextStep,
  prevStep,
  updateFormData
} from "@/app/lib/redux/features/form/multipleStepFormSlice";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import TextArea from "@/src/components/ui/forms/TextArea";
import { InnerCardLayout } from "@/src/components/ui/layout/CardLayout";
import { Upload } from "lucide-react";
import Image from "next/image";

import React, { ChangeEvent, useEffect, useState } from "react";
const FormStepsStyles = {
  formStepsDev: `flex flex-col md:flex-row items-center md:gap-4`,
  formStepsHeading: `md:text-2xl text-xl font-medium text-stone-700`
};

function Page() {
  const { currentStep } = useAppSelector((state) => state.doctorStep);
  const progressBarWidth = ((currentStep - 1) / (TOTAL_FORM_STEPS - 1)) * 100;
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 "></div>
      <div>
        <ul className="flex justify-between bg-white  md:gap-32 shadow-shadow1 px-6 py-3 rounded-md  gap-2  flex-col md:flex-row md:items-center">
          <li className="text-base text-stone-600 font-medium">
            Complete your profile in few steps ({currentStep}/{TOTAL_FORM_STEPS}
            )
          </li>
          <li className="flex-1">
            <p className="relative w-full bg-gray-200 h-3 rounded-full">
              <span
                style={{ width: `${progressBarWidth}%` }}
                className="bg-primary_color  absolute h-full left-0 top-0 bottom-0 rounded-full "
              ></span>
            </p>
          </li>
        </ul>
      </div>
      <main>
        <StepFormLayout />
      </main>
    </div>
  );
}

export default Page;

const StepFormLayout = () => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.doctorStep);

  const handleNext = () => {
    // Simple check if fields are empty
    if (!formData.hospital_name || !formData.medical_license) {
      alert("Please fill all fields");
      return;
    }
    dispatch(nextStep());
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

const StepOneForm = () => {
  const dispatch = useAppDispatch();
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === "") console.log("Please field all the field");
    dispatch(
      updateFormData({
        field: name as keyof DoctorOnboardingForm,
        value: value
      })
    );
  };
  const { formData } = useAppSelector((state) => state.doctorStep);
  console.log(formData);
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Practical information
      </div>
      <div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            onChange={handleFormChange}
            name={FORM_FIELDS.HOSPITAL_ADDRESS}
            inputType="text"
            value={formData.hospital_address}
            inputPlaceholder="Hospital address"
          />
          <Input
            onChange={handleFormChange}
            name={FORM_FIELDS.YEARS_OF_EXPERIENCE}
            inputType="text"
            value={formData.years_of_experience}
            inputPlaceholder="Years of experience"
          />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            value={formData.hospital_name}
            onChange={handleFormChange}
            name={FORM_FIELDS.HOSPITAL_NAME}
            inputType="text"
            inputPlaceholder="Hospital name"
          />
          <Input
            value={formData.medical_license}
            onChange={handleFormChange}
            name={FORM_FIELDS.MEDICAL_LICENSE}
            inputType="text"
            inputPlaceholder="Medical license number"
          />
        </div>
      </div>
    </>
  );
};

const StepTwoForm = () => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.doctorStep);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(
      updateFormData({
        field: name as keyof DoctorOnboardingForm,
        value: value
      })
    );
  };
  console.log(formData);
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Address and Working days
      </div>
      <div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            onChange={handleFormChange}
            name="country"
            value={formData.country}
            inputType="text"
            inputPlaceholder="Country "
          />
          <Input
            value={formData.state}
            name="state"
            onChange={handleFormChange}
            inputType="text"
            inputPlaceholder="State"
          />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            value={formData.city}
            name="city"
            onChange={handleFormChange}
            inputType="text"
            inputPlaceholder="City"
          />
          <Input
            value={formData.zip_code}
            name="zip_code"
            onChange={handleFormChange}
            inputType="text"
            inputPlaceholder="Zip code"
          />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            value={formData.working_days}
            name="working_days"
            onChange={handleFormChange}
            inputType="text"
            inputPlaceholder="Working days Exp: Mon, Wed"
          />
        </div>
      </div>
    </>
  );
};

const StepThreeForm = () => {
  const dispatch = useAppDispatch();
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      updateFormData({
        field: name as keyof DoctorOnboardingForm,
        value: value
      })
    );
  };
  const { formData } = useAppSelector((state) => state.doctorStep);
  console.log(formData);
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
            value={formData.about}
            id="about"
          />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
            name="language"
            onChange={handleFormChange}
            value={formData.language}
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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  // Handle file preview when file changes
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && typeof event.target.result === "string") {
        setPreview(event.target.result);
        // Dispatch after preview is ready
        dispatch(
          updateFormData({
            field: "profile_photo" as keyof DoctorOnboardingForm,
            value: event.target.result
          })
        );
      }
    };
    reader.readAsDataURL(file);

    // Cleanup
    return () => {
      reader.abort();
    };
  }, [file, dispatch]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

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
          name="profile_photo"
          onChange={handleFile}
          accept="image/*"
          hidden
          multiple={false}
          id="profile"
          type="file"
        />
      </div>
      {preview && (
        <div className="relative cursor-pointer h-[200px] md:h-[250px] w-full md:w-[300px] mt-2 rounded-md overflow-hidden">
          <Image
            src={preview}
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

const RenderForm = () => {
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
