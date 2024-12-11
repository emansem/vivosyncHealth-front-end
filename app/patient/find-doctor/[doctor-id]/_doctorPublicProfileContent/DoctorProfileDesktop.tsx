import { useSubscriptionPlan } from "@/src/hooks/useSubscription";
import { AboutSection } from "./AboutSection";
import { SubscriptionPlanSection } from "./PricingPlanSection";
import { ReviewSection } from "./ReviewSection";

export const DoctorDeskTopProfile = () => {
  const { handleToggle, activeIndices } = useSubscriptionPlan();
  return (
    <div className="flex justify-between  flex-col-reverse items-start h-full relative md:flex-row gap-4 md:gap-10 lg:gap-24">
      <div className="md:flex-1 flex-col  flex gap-4 ">
        <div className="p-4 shadow-shadow2 bg-white  rounded-xl">
          <AboutSection />
        </div>
        <div>
          <ReviewSection
            activeIndices={activeIndices}
            handleToggleReviews={handleToggle}
          />
        </div>
      </div>
      <SubscriptionPlanSection />
    </div>
  );
};
