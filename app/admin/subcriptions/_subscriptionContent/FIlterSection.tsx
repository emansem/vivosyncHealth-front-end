import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Card } from "@/src/components/utils/Card";
import { FilterSubscription } from "@/src/hooks/admin/useSubscription";
import { ChangeEvent } from "react";
interface FIlterSectionProps {
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterSubscriptionValues: FilterSubscription;
}

function FIlterSection({
  handleOnChange,
  filterSubscriptionValues
}: FIlterSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row w-full md:w-[60%]  gap-2 justify-items-end">
        <SelectInput
          id=""
          name="plan_type"
          value={filterSubscriptionValues.plan_type}
          onChange={handleOnChange}
          options={[
            { value: "", label: "All Plans" },
            { value: "premium", label: "Premium Plan" },
            { value: "basic", label: "Basic Plan" },
            { value: "standard", label: "Standard Plan" }
          ]}
        />
        <SelectInput
          id=""
          name="status"
          value={filterSubscriptionValues.status}
          onChange={handleOnChange}
          options={[
            { value: "", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "pending", label: "Pending" },
            { value: "expired", label: "Expired" },
            { value: "cancelled", label: "Cancelled" }
          ]}
        />
      </div>
    </Card>
  );
}

export default FIlterSection;
