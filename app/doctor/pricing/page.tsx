import { subscriptionPlans } from "@/data/demoPlansData";
import {
  DOCTOR_SUBSCRIPTION_PLAN_FIELD,
  MobileSubscriptionPlansField
} from "@/data/table";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import MobileTable from "@/src/components/utils/table/MobileTable";
import { TableHead } from "@/src/components/utils/table/TableHead";
import TableLayout from "@/src/components/utils/table/TableLayout";
import { EllipsisVertical } from "lucide-react";

const TableData = () => {
  return (
    <tbody>
      {subscriptionPlans.map((plan, index) => (
        <tr className="hover:bg-green-50" key={index}>
          <td>{plan.name}</td>
          <td>{plan.price}</td>
          <td>{plan.discountPercentage}</td>
          <td>{plan.status}</td>
          <td className="flex  justify-end">
            <div className="flex  ">
              <span>Update</span>
              <span>Delete</span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const DesktopTable = () => {
  return (
    <>
      <TableLayout>
        <TableHead tableHeadTitle={DOCTOR_SUBSCRIPTION_PLAN_FIELD} />
        <TableData />
      </TableLayout>
    </>
  );
};

function page() {
  return (
    <div>
      <div className="flex justify-end py-2 ">
        <div className="cursor-pointer w-1/2 md:w-[250px]">
          <PrimaryButton
            backgroud
            children="Add new plans"
            color="text-white"
          />
        </div>
      </div>
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      <div className="md:hidden">
        <MobileTable
          data={subscriptionPlans}
          fields={MobileSubscriptionPlansField}
        />
      </div>
    </div>
  );
}

export default page;
