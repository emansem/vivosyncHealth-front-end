"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import usePricingPlan from "@/src/hooks/usePricingPlan";
import React from "react";
import PlanSelectFields from "./_create-planContent/PlanSelectFields";
import PlanInputsField from "./_create-planContent/PlanInputsField";
import PlanFeaturesInputs from "./_create-planContent/PlanFeaturesInputs";

function CreatePlanPage() {
  const {
    handleAddNewFeacture,
    planfeatures,
    handleOnchangePlanFeature,
    handleOnselectOPtion,
    errorMessage,
    handleOnchangePlanInputsField,
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
          <form>
            {/* Subscription plan inputs field */}
            <PlanInputsField
              errorMessage={errorMessage}
              handleOnchangePlanInputsField={handleOnchangePlanInputsField}
            />

            {/* Select options field here */}
            <PlanFeaturesInputs
              handleOnchangePlanFeature={handleOnchangePlanFeature}
              planfeatures={planfeatures}
              handleAddNewFeacture={handleAddNewFeacture}
            />

            {/* Select options field here */}
            <PlanSelectFields
              isRefundEnabled={isRefundEnabled}
              handleOnselectOPtion={handleOnselectOPtion}
            />
            <div>
              <div className="pt-4">
                <PrimaryButton type="submit" backgroud color="text-white">
                  Add now
                </PrimaryButton>
              </div>
            </div>
          </form>
        </CardLayout>
      </div>
    </div>
  );
}

export default CreatePlanPage;
