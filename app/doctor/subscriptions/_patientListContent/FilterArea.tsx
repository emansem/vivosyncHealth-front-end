import { filterTag } from "@/data/table";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { TableStyles } from "@/src/components/utils/css/generalstyles";
import useFilterHook from "@/src/hooks/useFilterHook";
import { ChangeEvent } from "react";

interface TableTabAreaProps {
  value: string;
  handleFilterPlanType: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export const TableTabArea = ({
  value,
  handleFilterPlanType
}: TableTabAreaProps) => {
  const SUBSCRIPTION_FILTER_PLAN_TYPES = [
    {
      label: "Select Plan Type",
      value: "all"
    },
    {
      label: "Basic",
      value: "basic"
    },
    {
      label: "Standard",
      value: "standard"
    },
    {
      label: "Premium",
      value: "premium"
    }
  ];
  const { activeIndex, filterTags } = useFilterHook();
  return (
    <div className="flex flex-col bg-white p-4 rounded-md md:flex-row md:justify-end items-center gap-5">
      <div className="relative w-full md:w-[20%]">
        <SelectInput
          value={value}
          onChange={handleFilterPlanType}
          options={SUBSCRIPTION_FILTER_PLAN_TYPES}
          id="planType"
        />
      </div>
      <ul className={`${TableStyles.filterTags} w-full md:w-auto`}>
        {filterTag.map((tag, index) => (
          <li
            onClick={() => filterTags(tag.status, index)}
            className={`${
              activeIndex === index
                ? "bg-primary_color text-white rounded-lg"
                : "text-stone-500"
            } py-2 px-4 `}
            key={index}
          >
            {tag.status}
          </li>
        ))}
      </ul>
    </div>
  );
};
