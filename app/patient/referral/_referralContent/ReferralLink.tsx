import { ReferralLinkProps } from "@/app/lib/types";
import { Copy } from "lucide-react";
import { useState } from "react";

export const ReferralLink = ({ referralLink }: ReferralLinkProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
      <div className="flex space-x-4">
        <input
          value={referralLink}
          readOnly
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          onClick={copyToClipboard}
          className="bg-primary_color text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:opacity-90"
        >
          <Copy className="h-4 w-4" />
          <span>{copied ? "Copied!" : "Copy Link"}</span>
        </button>
      </div>
    </div>
  );
};
