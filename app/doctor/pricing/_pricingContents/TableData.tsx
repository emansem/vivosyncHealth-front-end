import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  getPlanId,
  openModal
} from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";
import Link from "next/link";
import { useGetAllSubscriptionPlansData } from "@/src/hooks/usePricingPlan";
import { getStatusColor } from "@/src/components/utils/getStatusColor";

const getPlanType = (plantype: string) => {
  return plantype.charAt(0).toUpperCase() + plantype.slice(1);
};

function TableData() {
  const { data } = useGetAllSubscriptionPlansData();
  // const { handleDeletePlan } = useContext(SubscriptionContext);
  const dispatch = useAppDispatch();

  const handleGetPlanIdAndOpen = (id: number) => {
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
            <div className="4 flex items-center  gap-4">
              <span
                onClick={() => handleGetPlanIdAndOpen(plan.id as number)}
                className="bg-red-600/10 text-red-500 cursor-pointer text-base py-2 px-4 rounded-md"
              >
                Delete
              </span>
              <Link href={`/doctor/pricing/${plan.id}`}>
                <span className="bg-primary_color/10 text-primary_color cursor-pointer text-base py-2 px-4 rounded-md">
                  Update
                </span>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableData;
