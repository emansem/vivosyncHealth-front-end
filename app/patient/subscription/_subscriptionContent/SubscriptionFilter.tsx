import { SUBSCRIPTION_FILTER_OPTIONS } from "@/app/lib/constant";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { FilterValues } from "@/src/hooks/useSubscription";
import { ChangeEvent } from "react";
interface SubscriptionFilterProps {
  handleOnchange: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
  filterValues: FilterValues;
  handleResetFilter: () => void;
}

export const SubscriptionFilter = ({
  handleOnchange,
  handleResetFilter,
  filterValues
}: SubscriptionFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscription Status
          </label>
          <SelectInput
            value={filterValues.status || ""}
            onChange={handleOnchange}
            id="status"
            name="status"
            options={SUBSCRIPTION_FILTER_OPTIONS}
          />
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <Input
            value={filterValues.startDate || ""}
            onChange={handleOnchange}
            id="startDate"
            inputType="date"
            name="startDate"
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <Input
            value={filterValues.endDate || ""}
            onChange={handleOnchange}
            id="endDate"
            inputType="date"
            name="endDate"
          />
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={handleResetFilter}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
