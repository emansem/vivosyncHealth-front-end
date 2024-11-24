import { subscriptionPlans } from "@/data/demoPlansData";

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

function TableData() {
  return (
    <tbody>
      {subscriptionPlans.map((plan, index) => (
        <tr className="hover:bg-green-50" key={index}>
          <td>{plan.plan_type}</td>
          <td>{plan.price}</td>
          <td>{plan.discountPercentage}</td>
          <td>{plan.duration}</td>
          <td>
            <span
              className={`${getStatusColor(
                plan.status
              )} rounded-full py-1 px-4`}
            >
              {plan.status}
            </span>
          </td>
          <td className="flex relative justify-end">
            {/* <span className="cursor-pointer">
              <EllipsisVertical />
            </span> */}
            <div className="4 flex  gap-4">
              <span className="bg-red-600/10 text-red-500 cursor-pointer text-base py-2 px-4 rounded-md">
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
