import { subscriptionPlans } from "@/data/demoPlansData";
import { MobileSubscriptionPlansField } from "@/data/table";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import MobileTable from "@/src/components/utils/table/MobileTable";

import PlanDeskTopTable from "./_pricingContents/PlanDeskTopTable";

function PricingPage() {
  return (
    <div>
      <div className="flex justify-end py-2 ">
        <div className="cursor-pointer w-1/2 md:w-[250px]">
          <PrimaryButton
            backgroud
            children="Add new plans"
            color="text-white"
          />
        </div>
      </div>
      <div className="hidden md:block">
        <PlanDeskTopTable />
      </div>
      <div className="md:hidden">
        <MobileTable
          data={subscriptionPlans}
          fields={MobileSubscriptionPlansField}
        />
      </div>
    </div>
  );
}

export default PricingPage;
