import { useState } from "react";
import { ReferralLink } from "./_referralContent/ReferralLink";
import { StatsSection } from "./_referralContent/StateSection";
import { referralData } from "@/data/demoData";
import { ReferralTable } from "./_referralContent/ReferralTable";

const ReferralPage = () => {
  // In a real app, this would come from an API
  const [referralLink] = useState("https://yourapp.com/refer/ABC123");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <StatsSection />
        <ReferralLink referralLink={referralLink} />
        <ReferralTable referrals={referralData} />
      </div>
    </div>
  );
};

export default ReferralPage;
