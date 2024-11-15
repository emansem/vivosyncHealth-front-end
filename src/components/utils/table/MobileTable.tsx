interface FieldTypes<T> {
  label: string;
  key: keyof T;
}
interface MobileTableProps<T> {
  data: T[];
  fields: FieldTypes<T>[];
}

const getStatusColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

function MobileTable<T>({ data, fields }: MobileTableProps<T>) {
  return (
    <div className="w-full md:hidden space-y-4">
      {data.map((patient, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          {/* Each info row */}
          <div className="divide-y">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex justify-between p-4 hover:bg-gray-50"
              >
                <span className="text-gray-600 font-medium">{field.label}</span>
                {field.key === "status" ? (
                  <span
                    className={`
              px-3 py-1 rounded-full text-sm font-medium
             ${getStatusColor(String(patient[field.key]))}

            `}
                  >
                    {String(patient[field.key])}
                  </span>
                ) : (
                  <span>{String(patient[field.key])}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileTable;
