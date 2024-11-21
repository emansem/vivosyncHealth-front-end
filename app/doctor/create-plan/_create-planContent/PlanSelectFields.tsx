import {
  IS_REFUND_SELECT_OPTIONS,
  PLAN_DURATION_OPTIONS,
  REFUND_DAYS_OPTION,
  PLAN_TYPE_OPTIONS
} from "@/app/lib/constant";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { ChangeEvent } from "react";
interface PlanSelectFieldsProps {
  isRefundEnabled: boolean;
  handleOnselectOPtion: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const PlanSelectFields = ({
  handleOnselectOPtion,
  isRefundEnabled
}: PlanSelectFieldsProps) => {
  return (
    <div className="pt-4">
      <SelectInput
        label="Choose Plan type"
        onChange={handleOnselectOPtion}
        id="planType"
        name="planType"
        options={PLAN_TYPE_OPTIONS}
      />

      <SelectInput
        label="Do you want to allow refund?"
        name="refundAnswer"
        onChange={handleOnselectOPtion}
        id="refund"
        options={IS_REFUND_SELECT_OPTIONS}
      />
      <div className={`${!isRefundEnabled && "hidden"}`}>
        <SelectInput
          label="How many days?"
          onChange={handleOnselectOPtion}
          id="refundDays"
          name="refundDays"
          options={REFUND_DAYS_OPTION}
        />
      </div>

      <SelectInput
        label="Plan Duration"
        onChange={handleOnselectOPtion}
        id="duration"
        options={PLAN_DURATION_OPTIONS}
      />
    </div>
  );
};

export default PlanSelectFields;
