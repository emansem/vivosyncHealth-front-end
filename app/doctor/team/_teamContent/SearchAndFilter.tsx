import { Search, Filter } from "lucide-react";
import { useState } from "react";

function SearchAndFilter() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search doctors by name or specialization..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
        <Filter className="w-5 h-5" />
        Filter
      </button>
    </div>
  );
}

export default SearchAndFilter;
