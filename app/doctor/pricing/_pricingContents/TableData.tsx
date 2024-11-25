import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  getPlanId,
  openModal
} from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";

import { useGetAllSubscriptionPlansData } from "@/src/hooks/usePricingPlan";

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-secondary_color/10 text-primary_color";
    case "inactive":
      return "bg-red-600/10 text-red-500";

    default:
      break;
  }
};
const getPlanType = (plantype: string) => {
  return plantype.charAt(0).toUpperCase() + plantype.slice(1);
};

function TableData() {
  const { data } = useGetAllSubscriptionPlansData();
  // const { handleDeletePlan } = useContext(SubscriptionContext);
  const dispatch = useAppDispatch();

  const handleGetPlanIdAndOpen = (id: number) => {
    console.log("Subscription plan id", id);
    dispatch(getPlanId(id));
    dispatch(openModal());
  };

  return (
    <tbody>
      {data?.data.plans.map((plan, index) => (
        <tr className="hover:bg-green-50" key={index}>
          <td>{getPlanType(plan.plan_type as string)}</td>
          <td>{plan.amount}</td>
          <td>{plan.discount_percentage}</td>
          <td>{plan.plan_duration}</td>
          <td>
            <span
              className={`${getStatusColor(
                plan.plan_status
              )} rounded-full py-1 px-4`}
            >
              {plan.plan_status}
            </span>
          </td>
          <td className="flex relative justify-end">
            {/* <span className="cursor-pointer">
              <EllipsisVertical />
            </span> */}
            <div className="4 flex  gap-4">
              <span
                onClick={() => handleGetPlanIdAndOpen(plan.id as number)}
                className="bg-red-600/10 text-red-500 cursor-pointer text-base py-2 px-4 rounded-md"
              >
                Delete
              </span>
              <span className="bg-primary_color/10 text-primary_color cursor-pointer text-base py-2 px-4 rounded-md">
                Update
              </span>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableData;
