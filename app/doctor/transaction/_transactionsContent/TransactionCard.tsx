import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar
} from "lucide-react";

export const statusStyles = {
  active: "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700"
};

const statusIcons = {
  active: <CheckCircle className="w-4 h-4" />,
  expired: <XCircle className="w-4 h-4" />,
  pending: <Clock className="w-4 h-4" />,
  failed: <AlertCircle className="w-4 h-4" />
};
export const TransactionCard = ({
  date,
  customer,
  email,
  type,
  amount,
  status
}: {
  date: string;
  customer: string;
  email: string;
  type: string;
  amount: string;
  status: string;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Side - Customer Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {customer.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-800">{customer}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>

        {/* Middle - Transaction Info */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <Calendar className="w-4 h-4 inline mr-1" />
            {date}
          </div>
          <div className="font-medium">₦{amount}</div>
        </div>

        {/* Right Side - Status */}
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 
            ${statusStyles[status.toLowerCase() as keyof typeof statusStyles]}`}
          >
            {statusIcons[status.toLowerCase() as keyof typeof statusIcons]}
            {status}
          </span>
          <span className="text-sm text-gray-500">{type}</span>
        </div>
      </div>
    </div>
  );
};
