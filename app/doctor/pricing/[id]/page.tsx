"use client";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import PlanSelectFields from "../../create-plan/_create-planContent/PlanSelectFields";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { useParams } from "next/navigation";
import { useUpdateSubscriptionPlan } from "@/src/hooks/pricingPlan/useUpdatePlan";

function UpdateSubscriptionPlan() {
  const params = useParams();
  const id = params.id as string;
  console.log(id);
  const {
    handleOnselectOPtion,
    handleOnchangePlanInputsField,
    planInputsValue,
    isRefundEnabled,
    planfeatures,
    isPending,
    isLoading,
    planType,
    handleSubmitPlanUpdateData,
    handleOnchangePlanFeature
  } = useUpdateSubscriptionPlan(id);

  if (isLoading) return <div>loading.....</div>;

  return (
    <div>
      <CardLayout>
        <PageHeading title="Update your plan" />
        <div>
          <Input
            onChange={handleOnchangePlanInputsField}
            name="name"
            label="Plan Name"
            value={planInputsValue?.name}
            inputType="text"
          />
          <Input
            onChange={handleOnchangePlanInputsField}
            label="Plan Amount"
            name="amount"
            value={planInputsValue?.amount.toString()}
            inputType="number"
          />
          <Input
            onChange={handleOnchangePlanInputsField}
            name="discount_percentage"
            label="Discount Percentage"
            value={planInputsValue?.discount_percentage.toString()}
            inputType="number"
          />
          <p className="text-lg text-text_color2 font-medium">Plan Features</p>
          {planfeatures.map((feature) => (
            <Input
              onChange={(e) => handleOnchangePlanFeature(e, feature.id)}
              key={feature.id}
              value={feature.value}
              inputType="text"
            />
          ))}
          <Input
            value={planType}
            isReadOnly
            label="Plan Type"
            inputType="text"
          />
          <PlanSelectFields
            allowPlanType={false}
            handleOnselectOPtion={handleOnselectOPtion}
            isRefundEnabled={isRefundEnabled}
          />
        </div>
        <div className="pt-4">
          <PrimaryButton
            onClick={handleSubmitPlanUpdateData}
            backgroud
            color="text-white"
          >
            {isPending ? "Please wait saving.." : "Save Details"}
          </PrimaryButton>
        </div>
      </CardLayout>
    </div>
  );
}

export default UpdateSubscriptionPlan;
