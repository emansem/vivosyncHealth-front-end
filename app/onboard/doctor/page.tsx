"use client";
import { TOTAL_FORM_STEPS } from "@/app/lib/constant";
import { useAppSelector } from "@/app/lib/hooks";

import { StepFormLayout } from "./_doctorOnboardingContents/StepFormLayout";

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
