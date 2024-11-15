import PaginationButton from "@/src/components/utils/table/Pagination";
import { TableHead } from "@/src/components/utils/table/TableHead";
import TableLayout from "@/src/components/utils/table/TableLayout";
import usePaginationHook from "@/src/hooks/usePaginationHook";
import { TableBody } from "../_patientListContent/TableBody";
import { subscriptionData } from "@/data/patientlist";
import { PATIENTLIST_TABLE_FIELDS } from "@/data/table";
export const DesktopTable = () => {
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
