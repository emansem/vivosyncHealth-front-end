"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import usePricingPlan from "@/src/hooks/usePricingPlan";

import React from "react";

function page() {
  const refundDaysData = [
    { label: "60 Days", value: 60 },
    { label: "30 Days", value: 30 },
    { label: "7 Days", value: 7 }
  ];
  const isRefund = [
    { label: "Select your answer", value: "" },
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" }
  ];
  const {
    handleAddNewFeacture,
    planfeatures,
    refundAnswear,
    refundDays,
    handReFundChange,
    isRefundEnabled
  } = usePricingPlan();
  return (
    <div>
      <div>
        <CardLayout>
          <PageHeading
            title="Add subscription plan"
            subTitle="Please fill all the inputs below to add a subscription plan"
          />
          <form action="">
            <div>
              <Input inputType="text" inputPlaceholder="Enter plan name" />
            </div>
            <div>
              <Input inputType="number" inputPlaceholder="Enter plan number" />
            </div>
          </form>

          <div>
            <div>
              <p className="text-base text-text_color2 font-medium">
                Add pricing plan features
              </p>
              {planfeatures.map((feature, index) => (
                <Input
                  key={index}
                  inputType="text"
                  inputPlaceholder="24/7 customer supports"
                />
              ))}
              <div onClick={handleAddNewFeacture}>
                <PrimaryButton
                  backgroud
                  color="text-white"
                  children="Add new feature"
                />
              </div>
            </div>
            <div>
              <p className="text-base text-text_color2 pt-4 font-medium ">
                Do you want to allow refund?
              </p>
              <SelectInput
                onChange={handReFundChange}
                id="refund"
                value={refundAnswear}
                options={isRefund}
              />
              <div className={`${!isRefundEnabled && "hidden"}`}>
                <p className="text-base text-text_color2 font-medium">
                  How many days?
                </p>
                <SelectInput
                  onChange={handReFundChange}
                  value={refundDays}
                  id="refund"
                  options={refundDaysData}
                />
              </div>
            </div>
            <div className="pt-4">
              <PrimaryButton backgroud color="text-white" children="Add now" />
            </div>
          </div>
        </CardLayout>
      </div>
    </div>
  );
}

export default page;
