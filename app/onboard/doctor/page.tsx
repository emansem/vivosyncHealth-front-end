"use client";
import { primary_color } from "@/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import TextArea from "@/src/components/ui/forms/TextArea";
import { InnerCardLayout } from "@/src/components/ui/layout/CardLayout";
import { Upload } from "lucide-react";
import Image from "next/image";

import React, { ChangeEvent, useState } from "react";
const FormStepsStyles = {
  formStepsDev: `flex flex-col md:flex-row items-center md:gap-4`,
  formStepsHeading: `md:text-2xl text-xl font-medium text-stone-700`
};

function page() {
  const steps = [
    {
      step: 1,
      lable: "Step 1"
    },
    {
      step: 2,
      lable: "Step 2"
    },
    {
      step: 3,
      lable: "Step 3"
    },
    {
      step: 4,
      lable: "Step 4"
    }
  ];
  console.log(steps);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 "></div>
      <div>
        <ul className="flex justify-between bg-white  md:gap-32 shadow-shadow1 px-6 py-3 rounded-md  gap-2  flex-col md:flex-row md:items-center">
          <li className="text-base text-stone-600 font-medium">
            Complete your profile in few steps (1/5)
          </li>
          <li className="flex-1">
            <p className="relative w-full bg-gray-200 h-3 rounded-full">
              <span className="bg-primary_color w-1/3 absolute h-full left-0 top-0 bottom-0 rounded-full "></span>
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

export default page;

const StepFormLayout = () => {
  return (
    <>
      <InnerCardLayout>
        {/* <StepOneForm /> */}
        {/* <StepTwoForm /> */}
        <StepThreeForm />
      </InnerCardLayout>
      <div className="flex justify-between my-6">
        <div className=" w-36 md:w-48">
          <PrimaryButton backgroud={false}>Back</PrimaryButton>
        </div>
        <div className=" w-36 md:w-48">
          <PrimaryButton backgroud color="text-white">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

// const StepOneForm = () => {
//   return (
//     <>
//       <div className={FormStepsStyles.formStepsHeading}>
//         Practical information
//       </div>
//       <div>
//         <div className={FormStepsStyles.formStepsDev}>
//           <Input inputType="text" inputPlaceholder="Hospital address" />
//           <Input inputType="text" inputPlaceholder="Years of experience" />
//         </div>
//         <div className={FormStepsStyles.formStepsDev}>
//           <Input inputType="text" inputPlaceholder="Hospital name" />
//           <Input inputType="text" inputPlaceholder="Medical license number" />
//         </div>
//       </div>
//     </>
//   );
// };

// const StepTwoForm = () => {
//   return (
//     <>
//       <div className={FormStepsStyles.formStepsHeading}>
//         Address and Working days
//       </div>
//       <div>
//         <div className={FormStepsStyles.formStepsDev}>
//           <Input inputType="text" inputPlaceholder="Country " />
//           <Input inputType="text" inputPlaceholder="State" />
//         </div>
//         <div className={FormStepsStyles.formStepsDev}>
//           <Input inputType="text" inputPlaceholder="City" />
//           <Input inputType="text" inputPlaceholder="Zip code" />
//         </div>
//         <div className={FormStepsStyles.formStepsDev}>
//           <Input
//             inputType="text"
//             inputPlaceholder="Working days Exp: Mon, Wed"
//           />
//         </div>
//       </div>
//     </>
//   );
// };

const StepThreeForm = () => {
  return (
    <>
      <div className={FormStepsStyles.formStepsHeading}>
        Write something about yourself
      </div>
      <div>
        <div className={FormStepsStyles.formStepsDev}>
          <TextArea id="about" />
        </div>
        <div className={FormStepsStyles.formStepsDev}>
          <Input
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
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };
  const render = () => {
    if (!file) return "no file";

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && typeof event.target.result === "string") {
        setPreview(event.target.result);
      }
    };

    reader.readAsDataURL(file);
  };
  render();
  return (
    <div>
      <div className="border-dotted border-2 flex justify-center items-center rounded-md border-gray-300 w-full h-40">
        <label className="flex items-center gap-2 flex-col" htmlFor="profile">
          <Upload size={40} color={primary_color} />
          <div className="flex flex-col text-center gap-1">
            <span className="text-base text-text_color2 font-medium ">
              Upload a professional profile photo
            </span>
            <span className="text-xs, text-text_color1  ">
              Drag and drop file here or click to upload
            </span>
          </div>
        </label>
        <input
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
            alt="Dr eman sem"
            fill
            sizes="70px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};
