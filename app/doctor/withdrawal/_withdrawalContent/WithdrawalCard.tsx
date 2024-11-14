import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Wallet,
  ChevronRight
} from "lucide-react";

export const WithdrawalCard = ({
  date,
  amount,
  status
}: {
  date: string;
  amount: number;
  status: string;
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      case "failed":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Wallet className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">₦{amount.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(
            status
          )}`}
        >
          {getStatusIcon(status)}
          {status}
        </span>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};
