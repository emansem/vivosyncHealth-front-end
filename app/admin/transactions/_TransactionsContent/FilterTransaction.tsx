import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Card } from "@/src/components/utils/Card";
import { useState } from "react";

function FilterTransaction() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  return (
    <Card className="p-6">
      <div className="">
        {/* <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div> */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <SelectInput
              id=""
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={[
                { value: "all", label: "All Types" },
                { value: "deposit", label: "Deposits" },
                { value: "withdrawal", label: "Withdrawals" },
                { value: "refund", label: "Refunds" },
                { value: "subscription", label: "Subscriptions" }
              ]}
            />
          </div>
          <div>
            <SelectInput
              id=""
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "completed", label: "Completed" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" }
              ]}
            />
          </div>
          <div>
            <Input
              inputType="date"
              name="startDate"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              inputPlaceholder="Start Date"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default FilterTransaction;
