import { SUBSCRIPTION_PLAN_TYPES } from "@/app/lib/constant";
import { SubscriptionPlanHeaderType } from "@/app/lib/types";
import { subscriptionPlans } from "@/data/demoPlansData";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { useSubscriptionPlan } from "@/src/hooks/useSubscriptionPlan";
import { SubscriptionPlan } from "@/src/types/general";
import { CircleCheck } from "lucide-react";

const SubscriptionSectionPlanHeader = ({
  getPlanType,
  plan_type
}: SubscriptionPlanHeaderType) => {
  return (
    <div className="bg-primary_color flex justify-between   w-full ">
      {SUBSCRIPTION_PLAN_TYPES.map((planType, index) => (
        <span
          onClick={() => getPlanType(planType.key)}
          key={index}
          className={`cursor-pointer py-3 px-6 text-white text-xl font-medium ${
            plan_type === planType.key && "bg-secondary_color "
          }`}
        >
          {planType.label}
        </span>
      ))}
    </div>
  );
};
const SubscriptionPlanSectionBody = ({
  subscriptionPlan
}: {
  subscriptionPlan: SubscriptionPlan[];
}) => {
  if (subscriptionPlan.length < 0) return;

  return (
    <>
      <div className="py-3 px-6 flex justify-between items-center">
        <span className="text-base md:text-xl font-medium text-stone-700">
          Starter
        </span>
        <li className="flex items-center text-stone-800 gap-2">
          <p className="flex items-center gap-1">
            <span className="text-secondary_color text-base">save up to</span>
            <span className="text-text_color2 font-medium text-base">
              {subscriptionPlan[0].discountPercentage}%
            </span>
          </p>
          <p>
            <span className="text-2xl font-semibold">
              ${subscriptionPlan[0].price}
            </span>
            <span className="text-sm text-text_color2">/month</span>
          </p>
        </li>
      </div>
      <div className="bg-green-100 px-6  py-3">
        <p className="text-base md:text-[18px] italic text-secondary_color font-medium">
          30 days money back gaurantee
        </p>
      </div>
    </>
  );
};
const SubscriptionPlanSectionFooter = ({
  subscriptionPlan
}: {
  subscriptionPlan: SubscriptionPlan[];
}) => {
  return (
    <>
      <div className="px-6 py-3 mb-2">
        <div>
          <h1 className="text-xl md:text-2xl   font-medium text-stone-700 my-3">
            What&apos;s Included
          </h1>
        </div>
        <ul className="flex flex-col gap-2">
          {subscriptionPlan[0].features?.map((feature, index) => (
            <li key={index} className="flex gap-2 items-center">
              <CircleCheck size={30} fill="#198754" color="#fff" />
              <span className="text-base text-text_color2">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-5 px-6  pb-3">
        <PrimaryButton backgroud color="text-white">
          Subscribe
        </PrimaryButton>
      </div>
    </>
  );
};

export const SubscriptionPlanSection = () => {
  const { planType, getPlanType } = useSubscriptionPlan();

  if (subscriptionPlans.length < 0) return;
  const subscriptionPlan = subscriptionPlans?.filter(
    (plan) => plan.plan_type === planType
  );
  return (
    <div className=" sticky overflow-hidden  rounded-xl shadow-shadow2 bg-white w-full md:w-[500px] ">
      <SubscriptionSectionPlanHeader
        plan_type={planType}
        getPlanType={getPlanType}
      />
      <SubscriptionPlanSectionBody subscriptionPlan={subscriptionPlan} />
      <SubscriptionPlanSectionFooter subscriptionPlan={subscriptionPlan} />
    </div>
  );
};
