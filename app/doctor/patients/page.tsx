"use client";

import { subscriptionData } from "@/data/patientlist";
import {
  filterTag,
  PATIENT_FIELDS,
  PATIENTLIST_TABLE_FIELDS
} from "@/data/table";
import { TableStyles } from "@/src/components/utils/css/generalstyles";
import MobileTable from "@/src/components/utils/table/MobileTable";
import PaginationButton from "@/src/components/utils/table/Pagination";
import { TableHead } from "@/src/components/utils/table/TableHead";
import TableLayout from "@/src/components/utils/table/TableLayout";
import useFilterHook from "@/src/hooks/useFilterHook";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { TableBodyProps } from "@/src/types/general";
import { Search } from "lucide-react";

//The search area, filter and sort seaction
const TableTabArea = () => {
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

//Table body section
const TableBody = ({
  subscriptionData,
  startIndex,
  endIndex
}: TableBodyProps) => {
  return (
    <tbody>
      {subscriptionData.slice(startIndex, endIndex).map((item, index) => (
        <tr className="cursor-pointer hover:bg-gray-50" key={index}>
          <td>{item.name}</td>
          <td>{item.patientId}</td>
          <td>{item.subDate}</td>
          <td>{item.expireDate}</td>
          <td>
            <span
              className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${
                item.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }
            `}
            >
              {item.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

//The desktop view of the table
const DesktopTable = () => {
  const totalResult = subscriptionData.length;
  const {
    pageNumber,
    pages,
    handlePrevButton,
    startIndex,
    endIndex,
    getPageNumber,
    handleNextButton
  } = usePaginationHook(totalResult);
  return (
    <>
      <TableLayout>
        <TableHead tableHeadTitle={PATIENTLIST_TABLE_FIELDS} />
        <TableBody
          startIndex={startIndex}
          endIndex={endIndex}
          subscriptionData={subscriptionData}
        />
      </TableLayout>
      <div className={`${totalResult < 11 && "hidden"}`}>
        <PaginationButton
          pageNumber={pageNumber}
          totalResult={totalResult}
          result={endIndex}
          handlePrevButton={handlePrevButton}
          handleNextButton={handleNextButton}
          getPageNumber={getPageNumber}
          pages={pages}
        />
      </div>
    </>
  );
};

//The main patients list table
function page() {
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <TableTabArea />
      </div>
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      <div className="md:hidden">
        <MobileTable fields={PATIENT_FIELDS} data={subscriptionData} />
      </div>
    </div>
  );
}

export default page;
