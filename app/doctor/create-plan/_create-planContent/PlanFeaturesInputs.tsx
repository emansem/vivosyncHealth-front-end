import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { PlanFeatures } from "@/src/hooks/pricingPlan/useUtileHook";
import React, { ChangeEvent } from "react";
interface PlanFeaturesProps {
  handleAddNewFeacture: () => void;
  handleOnchangePlanFeature: (
    e: ChangeEvent<HTMLInputElement>,
    id: number
  ) => void;
  planfeatures: PlanFeatures[];
}
function PlanFeaturesInputs({
  handleAddNewFeacture,
  planfeatures,
  handleOnchangePlanFeature
}: PlanFeaturesProps) {
  return (
    <div>
      <p className="text-base text-text_color2 font-medium">
        Add pricing plan features
      </p>
      {planfeatures.map((feature, index) => (
        <Input
          onChange={(e) => handleOnchangePlanFeature(e, feature.id)}
          key={index}
          inputType="text"
          inputPlaceholder="24/7 customer supports"
        />
      ))}
      <div onClick={handleAddNewFeacture}>
        <PrimaryButton type="button" backgroud color="text-white">
          Add new feature
        </PrimaryButton>
      </div>
    </div>
  );
}

export default PlanFeaturesInputs;
