import { Card } from "@/src/components/utils/Card";
import { baseInputStyles } from "@/src/components/utils/css/basicInputsStyles";
import { useFetchApplicationMetadata } from "@/src/hooks/useFetchGeneralData";
import SearchInput from "@/src/components/ui/forms/searchInput";
import { FilterDoctors } from "@/src/hooks/admin/useDoctors";
import { ChangeEvent } from "react";
import { Button } from "@/src/components/utils/Button";
interface FilterSectionProps {
  handleClearFilter: () => void;
  handleOnChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterValues: FilterDoctors;
}

function FilterSection({
  handleClearFilter,
  handleOnChange,
  filterValues
}: FilterSectionProps) {
  const { specialties, countries } = useFetchApplicationMetadata();
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
              <option value="all">Select Country</option>
              {countries?.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            <select
              name="specialty"
              value={filterValues.specialty}
              onChange={handleOnChange}
              className={`${baseInputStyles}  px-3 bg-transparent appearance-none cursor-pointer`}
            >
              <option value="all">Select Specialty</option>
              {specialties?.map((specialty) => (
                <option key={specialty.id} value={specialty.title}>
                  {specialty.title}
                </option>
              ))}
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
