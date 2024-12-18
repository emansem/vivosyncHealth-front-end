import { Card } from "@/src/components/utils/Card";
import { baseInputStyles } from "@/src/components/utils/css/basicInputsStyles";
import { useFetchApplicationMetadata } from "@/src/hooks/useFetchGeneralData";
import SearchInput from "@/src/components/ui/forms/searchInput";

function FilterSection() {
  const { specialties, countries } = useFetchApplicationMetadata();
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-2 items-center">
        <SearchInput placeholder="Search doctor by id,specialty,coountry" />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <select
              name="country"
              // onChange={handleOnselectValue}
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
          <div>
            <select
              name="specialty"
              // onChange={handleOnselectValue}
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
    </Card>
  );
}

export default FilterSection;
