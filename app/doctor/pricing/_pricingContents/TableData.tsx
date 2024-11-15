import { subscriptionPlans } from "@/data/demoPlansData";

function TableData() {
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
}

export default TableData;
