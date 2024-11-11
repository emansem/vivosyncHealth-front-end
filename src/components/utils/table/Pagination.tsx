import { PaginationButtonProps } from "@/src/types/general";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TableStyles } from "../css/generalstyles";

const PaginationButton = ({
  pages,
  getPageNumber,
  result,
  totalResult,
  handleNextButton,
  pageNumber,
  handlePrevButton
}: PaginationButtonProps) => {
  return (
    <div className="flex flex-col-reverse md:flex-row  gap-3 justify-between items-center my-2">
      <div className="flex gap-2 items-center text-base text-text_color2">
        <span>showing</span>
        <span className="text-stone-700 bg-[#ddd] px-4 py-1 rounded-md block">
          {result > totalResult ? totalResult : result}
        </span>
        <span>result out of {totalResult}</span>
      </div>
      <ul className="flex items-center gap-2">
        <li
          onClick={handlePrevButton}
          className={`${TableStyles.pagination} 
          ${pageNumber <= 1 && "cursor-not-allowed"}
           bg-[#ddd]`}
        >
          <ChevronLeft />
        </li>
        {pages.map((page, index) => (
          <li
            onClick={() => getPageNumber(page)}
            key={index}
            className={`${TableStyles.pagination} ${
              pageNumber === page
                ? "bg-secondary_color text-white"
                : "bg-[#ddd]"
            }`}
          >
            {page}
          </li>
        ))}
        <li className={`${TableStyles.pagination}`}>...</li>

        <li
          onClick={handleNextButton}
          className={`${TableStyles.pagination} ${
            pages.length === pageNumber && "cursor-not-allowed"
          } bg-[#ddd]`}
        >
          <ChevronRight />
        </li>
      </ul>
    </div>
  );
};

export default PaginationButton;
