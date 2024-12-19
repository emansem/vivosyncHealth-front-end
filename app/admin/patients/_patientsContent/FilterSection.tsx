import SearchInput from "@/src/components/ui/forms/searchInput";
import { Button } from "@/src/components/utils/Button";
import { Card } from "@/src/components/utils/Card";
import { baseInputStyles } from "@/src/components/utils/css/basicInputsStyles";
import { FilterPatients } from "@/src/hooks/admin/usePatients";
import { useFetchApplicationMetadata } from "@/src/hooks/useFetchGeneralData";
import { ChangeEvent } from "react";
interface FilterSectionProps {
  handleClearFilter: () => void;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterValues: FilterPatients;
}

function FilterSection({
  handleClearFilter,
  handleOnChange,
  filterValues
}: FilterSectionProps) {
  const { countries } = useFetchApplicationMetadata();
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <SearchInput
          name="searchValue"
          onChange={handleOnChange}
          value={filterValues.searchValue}
          placeholder="Search doctor by id,specialty,coountry"
        />

        <div className="grid grid-cols-2 w-full md:w-[40%] gap-3">
          <div className="w-full">
            <select
              name="country"
              value={filterValues.country}
              onChange={handleOnChange}
              className={`${baseInputStyles}  px-3 bg-transparent appearance-none cursor-pointer`}
            >
              <option value="">Select Country</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="status"
              value={filterValues.status}
              onChange={handleOnChange}
              className={`${baseInputStyles}  px-3 bg-transparent appearance-none cursor-pointer`}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <Button className="my-4" onClick={handleClearFilter} variant="outline">
        Clear filter
      </Button>
    </Card>
  );
}

export default FilterSection;
