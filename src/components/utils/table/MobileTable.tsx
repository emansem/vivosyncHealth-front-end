import { getStatusColor } from "../getStatusColor";
import Link from "next/link";
interface MobileTableProps<TData> {
  isActionEnabled?: boolean;
  handleDeletButton?: (id: number) => void;
  data?: TData[];
  fields: {
    key: keyof TData;
    label: string;
  }[];
}
function MobileTable<TData extends { id?: number }>({
  data,
  fields,
  isActionEnabled = false,
  handleDeletButton
}: MobileTableProps<TData>) {
  return (
    <div className="w-full md:hidden space-y-4">
      {data?.map((item, index) => (
        <div
          key={item.id || index}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          {/* Each info row */}
          <div className="divide-y">
            {fields.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                className="flex justify-between p-4 hover:bg-gray-50"
              >
                <span className="text-gray-600 font-medium">{field.label}</span>
                {field.key === "plan_status" || field.key === "status" ? (
                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${getStatusColor(String(item[field.key]))}
                    `}
                  >
                    {String(item[field.key])}
                  </span>
                ) : (
                  <span>{String(item[field.key])}</span>
                )}
              </div>
            ))}
          </div>
          {isActionEnabled && (
            <div className="divide-y">
              <div className="flex justify-between p-4 hover:bg-gray-50">
                <span className="text-gray-600 font-medium">Action</span>
                <div className="flex gap-2 items-center">
                  <span
                    onClick={() => {
                      if (handleDeletButton && item.id) {
                        handleDeletButton(item.id);
                      }
                    }}
                    className="bg-red-600/10 text-red-500 cursor-pointer text-base py-2 px-4 rounded-md"
                  >
                    Delete
                  </span>
                  {item.id && (
                    <Link href={`/doctor/pricing/${item.id}`}>
                      <span className="bg-primary_color/10 text-primary_color cursor-pointer text-base py-2 px-4 rounded-md">
                        Update
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MobileTable;
