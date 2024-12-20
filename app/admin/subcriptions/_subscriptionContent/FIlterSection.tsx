import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Card } from "@/src/components/utils/Card";

function FIlterSection() {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row w-full md:w-[60%]  gap-2 justify-items-end">
        <SelectInput
          id=""
          name="plan"
          // value={selectedPlan}
          // onChange={(e) => setSelectedPlan(e.target.value)}
          options={[
            { value: "all", label: "All Plans" },
            { value: "premium", label: "Premium Plan" },
            { value: "basic", label: "Basic Plan" },
            { value: "standard", label: "Standard Plan" }
          ]}
        />
        <SelectInput
          id=""
          name="status"
          // value={selectedStatus}
          // onChange={(e) => setSelectedStatus(e.target.value)}
          options={[
            { value: "all", label: "All Status" },
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
