import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import { Card } from "@/src/components/utils/Card";
import { FIlterTransaction } from "@/src/hooks/admin/useTransactions";
import { ChangeEvent } from "react";
interface FilterTransaction {
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterTransactionValues: FIlterTransaction;
  handleClearFilter: () => void;
}

function FilterTransaction({
  filterTransactionValues,
  handleClearFilter,
  handleOnChange
}: FilterTransaction) {
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
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <SelectInput
              id=""
              name="type"
              value={filterTransactionValues.type}
              onChange={handleOnChange}
              options={[
                { value: "", label: "All Types" },
                { value: "deposit", label: "Deposits" },
                { value: "withdrawal", label: "Withdrawals" },
                { value: "refund", label: "Refunds" },
                { value: "subscription", label: "Subscriptions" }
              ]}
            />
          </div>
          <div>
            <SelectInput
              value={filterTransactionValues.status}
              id=""
              name="status"
              onChange={handleOnChange}
              options={[
                { value: "", label: "All Status" },
                { value: "completed", label: "Completed" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" }
              ]}
            />
          </div>
          <div>
            <Input
              value={filterTransactionValues.startDate}
              inputType="date"
              name="startDate"
              onChange={handleOnChange}
              inputPlaceholder="Start Date"
            />
          </div>
          <div>
            <Input
              value={filterTransactionValues.endDate}
              inputType="date"
              name="endDate"
              onChange={handleOnChange}
              inputPlaceholder="End Date"
            />
          </div>
        </div>
      </div>
      <Button onClick={handleClearFilter} className="my-4" variant="outline">
        Clear filter
      </Button>
    </Card>
  );
}

export default FilterTransaction;
