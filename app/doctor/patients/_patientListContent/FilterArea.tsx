import { filterTag } from "@/data/table";
import { TableStyles } from "@/src/components/utils/css/generalstyles";
import { Search } from "lucide-react";
import useFilterHook from "@/src/hooks/useFilterHook";

export const TableTabArea = () => {
  const { activeIndex, filterTags } = useFilterHook();
  return (
    <div className="flex flex-col md:flex-row md:justify-end items-center gap-5">
      <div className="relative w-full md:w-auto">
        <input
          className="w-full py-4 px-10 text-[18px] outline-none shadow-shadow1 text-stone-500 rounded-lg"
          type="text"
          placeholder="Search by patient ID"
        />
        <div className="absolute top-5  px-3 cursor-pointer">
          <Search size={20} color="#a8a29e" />
        </div>
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
