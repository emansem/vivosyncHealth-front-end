"use client";
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

import {
  closeModal,
  getPlanId,
  openModal
} from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";
import Link from "next/link";
import { SubscriptionPlanDataType } from "@/app/lib/types";

function PricingPage() {
  const dispatch = useAppDispatch();

  const { isLoading, data } = useGetAllSubscriptionPlansData();
  // const { handleClose } = useContext(SubscriptionContext);
  const { open } = useAppSelector((state) => state.subscriptionPlan);
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleGetPlanIdAndOpen = (id: number) => {
    dispatch(getPlanId(id));
    dispatch(openModal());
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
          <Link href="/doctor/create-plan">
            <PrimaryButton
              backgroud
              children="Add new plans"
              color="text-white"
            />
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        <PlanDeskTopTable />
      </div>
      <div className="md:hidden">
        <MobileTable<SubscriptionPlanDataType>
          isActionEnabled={true}
          data={data?.data.plans}
          handleDeletButton={handleGetPlanIdAndOpen}
          fields={MobileSubscriptionPlansField}
        />
      </div>
    </div>
  );
}

export default PricingPage;
// function disPatch(arg0: {
//   payload: undefined;
//   type: "subscriptionPlan/closeModal";
// }) {
//   throw new Error("Function not implemented.");
// }
