import { DOCTOR_SUBSCRIPTION_PLAN_FIELD } from "@/data/table";
import { TableHead } from "@/src/components/utils/table/TableHead";
import TableLayout from "@/src/components/utils/table/TableLayout";
import TableData from "./TableData";

function PlanDeskTopTable() {
  return (
    <>
      <TableLayout>
        <TableHead tableHeadTitle={DOCTOR_SUBSCRIPTION_PLAN_FIELD} />
        <TableData />
      </TableLayout>
    </>
  );
}

export default PlanDeskTopTable;
