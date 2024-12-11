"use client";
import { MobileSubscriptionPlansField } from "@/data/table";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import MobileTable from "@/src/components/utils/table/MobileTable";

import PlanDeskTopTable from "./_pricingContents/PlanDeskTopTable";

import { GlobalWarningAlert } from "@/src/components/ui/alert/WarningAlert";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";

import {
  closeModal,
  getPlanId,
  openModal
} from "@/app/lib/redux/features/subscriptionPlanSlice/subscriptionPlanSlice";
import Link from "next/link";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import {
  useDeleteSubscriptionPlan,
  useGetAllSubscriptionPlansData
} from "@/src/hooks/pricingPlan/useRetreivePlanData";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

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
  const { handleSubmitDeletePlan, isPending } = useDeleteSubscriptionPlan();

  if (isLoading) return <LoadingState message="Loading Plans..." />;
  return (
    <div>
      <GlobalWarningAlert
        isOpen={open}
        isLoading={isPending}
        handleConfirmButton={handleSubmitDeletePlan}
        handleClose={handleClose}
      />
      <div className="flex justify-end py-2 ">
        {data?.data.plans.length !== 0 && (
          <div className="cursor-pointer w-1/2 md:w-[250px]">
            <Link href="/doctor/create-plan">
              <PrimaryButton
                backgroud
                children="Add new plans"
                color="text-white"
              />
            </Link>
          </div>
        )}
      </div>
      {/* No result section */}
      {data?.data.plans.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <div>
            <NoResults
              heading="No Subscription Plan Found"
              message="Get started by creating your first subscription plan"
            />
          </div>
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
      )}

      {data?.data.plans.length !== 0 && (
        <div>
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
      )}
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
