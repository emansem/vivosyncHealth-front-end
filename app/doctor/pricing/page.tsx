"use client";
import { subscriptionPlans } from "@/data/demoPlansData";
import { MobileSubscriptionPlansField } from "@/data/table";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import MobileTable from "@/src/components/utils/table/MobileTable";

import PlanDeskTopTable from "./_pricingContents/PlanDeskTopTable";
import {
  useDeleteSubscriptionPlan,
  useGetAllSubscriptionPlansData
} from "@/src/hooks/usePricingPlan";
import { GlobalWarningAlert } from "@/src/components/ui/alert/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

import { closeModal } from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";

function PricingPage() {
  const disPatch = useAppDispatch();

  const { isLoading } = useGetAllSubscriptionPlansData();
  // const { handleClose } = useContext(SubscriptionContext);
  const { open } = useAppSelector((state) => state.subscriptionPlan);
  const handleClose = () => {
    disPatch(closeModal());
  };
  const { planId, handleSubmitDeletePlan, isPending } =
    useDeleteSubscriptionPlan();

  if (isLoading) return <div>Loading.....</div>;
  return (
    <div>
      <GlobalWarningAlert
        isOpen={open}
        isLoading={isPending}
        handleConfirmButton={handleSubmitDeletePlan}
        handleClose={handleClose}
      />
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
function disPatch(arg0: {
  payload: undefined;
  type: "subscriptionPlan/closeModal";
}) {
  throw new Error("Function not implemented.");
}
