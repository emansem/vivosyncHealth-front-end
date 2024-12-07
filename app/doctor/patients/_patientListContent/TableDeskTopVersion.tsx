import PaginationButton from "@/src/components/utils/table/Pagination";
import { TableHead } from "@/src/components/utils/table/TableHead";
import TableLayout from "@/src/components/utils/table/TableLayout";
import { TableBody } from "../_patientListContent/TableBody";
import { PATIENTLIST_TABLE_FIELDS } from "@/data/table";
import { Patient } from "@/src/types/general";
interface DesktopTableProps {
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  startIndex: number;
  pages: number[];
  subscriptionData: Patient[];
}
export const DesktopTable = ({
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,
  subscriptionData,
  startIndex,
  totalResult,
  getPageNumber,
  pageNumber
}: DesktopTableProps) => {
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
