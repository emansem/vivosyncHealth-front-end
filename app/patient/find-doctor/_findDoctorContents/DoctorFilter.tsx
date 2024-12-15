import React, { ChangeEvent, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useFetchApplicationMetadata } from "@/src/hooks/useFetchGeneralData";
interface DoctorFilterProps {
  handleOnselectValue: (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => void;
}

const DoctorFilter = ({ handleOnselectValue }: DoctorFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const { specialties, countries } = useFetchApplicationMetadata();

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          Find Your Doctor
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Filter className="h-5 w-5" />
          <span>Filters</span>
          <ChevronDown
            className={`h-4 w-4 transform transition-transform ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          onChange={handleOnselectValue}
          name="searchValue"
          type="text"
          placeholder="Search by doctor name, specialty, or condition..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border  border-gray-200 focus:ring-2 focus:ring-primary_color focus:border-transparent outline-none"
        />
      </div>

      {/* Filter Options */}
      <div
        className={`grid gap-4 transition-all duration-300 ${
          showFilters ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "hidden"
        }`}
      >
        {/* Specialty Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Specialties
          </label>
          <select
            name="specialityValue"
            onChange={handleOnselectValue}
            className="w-full capitalize l p-2 outline-none rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            <option value="all">Select Specialty</option>
            {specialties?.map((specialty) => (
              <option key={specialty.id} value={specialty.title}>
                {specialty.title}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <select
            name="locationValue"
            onChange={handleOnselectValue}
            className="w-full p-2 outline-none rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            <option value="all">Select Location</option>
            {countries?.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <select className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary_color focus:border-transparent">
            <option value="all">Select Day</option>
            {availability?.map((day) => (
              <option key={day.id} value={day.day}>
                {day.day}
              </option>
            ))}
          </select>
        </div> */}

        {/* Rating Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            name="ratingValue"
            onChange={handleOnselectValue}
            className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary_color focus:border-transparent"
          >
            <option value="all">Any Rating</option>
            <option value="4.5">4.5+ Stars</option>
            <option value="4.0">4.0+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        {showFilters && (
          <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary_color/10  text-secondary_color text-sm">
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorFilter;
