import { ReferralTableProps } from "@/app/lib/types";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "text-green-600 bg-green-100";
    case "pending":
      return "text-yellow-600 bg-yellow-100";
    case "completed":
      return "text-blue-600 bg-blue-100";
    default:
      return "";
  }
};
