import { TableBodyProps } from "@/src/types/general";

export const TableBody = ({
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
