"use client";
import React from "react";
import Image from "next/image";
import { CircleCheck, Star } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { subscriptionPlans } from "@/data/demoPlansData";
import { SubscriptionPlan } from "@/src/types/general";
import { useSubscriptionPlan } from "@/src/hooks/useSubscriptionPlan";
import { patientReviews } from "@/data/demoPatientReviews";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import timeAgo from "@/src/helper/timeAgo";
import { PageHeading } from "@/src/components/ui/layout/CardLayout";
const Styles = {
  aboutSectionList: `grid grid-cols-2  place-content-between gap-10`,
  aboutSectionListItem: `flex  my-2 gap-1 flex-col`,
  aboutSectionListHeading: `text-[18px] text-stone-700 font-medium`,
  aboutSectionListSubheading: `text-base text-text_color2 font-normal`
};

type SubscriptionPlanType = {
  label: string;
  key: "Basic" | "Standard" | "Premium";
};
const SUBSCRIPTION_PLAN_TYPES: SubscriptionPlanType[] = [
  {
    label: "Basic",
    key: "Basic"
  },
  {
    label: "Standard",
    key: "Standard"
  },
  {
    label: "Premium",
    key: "Premium"
  }
];

const CreatReviewStars = ({ rating }: { rating: number }) => {
  //create a full star if the rating is greater or equal to 5
  const handleCreatingStars = () => {
    const stars = Array.from({ length: Math.floor(rating) }, (__, i) => (
      <span className="text-2xl text-yellow-400" key={i}>
        <FaStar />
      </span>
    ));

    return stars;
  };
  //Create a half star if the rating is above 4.5 or less than 5 and create an empty star if the rating is less than 4.5
  const createHalfStarOrEmpty = () => {
    if (rating > 4.5 && Math.floor(rating) < 5) {
      return (
        <span className="text-2xl text-yellow-400">
          <FaStarHalfAlt />
        </span>
      );
    } else {
      const stars = Array.from({ length: 5 - Math.floor(rating) }, (__, i) => (
        <span className="text-2xl text-stone-600" key={i}>
          <FaRegStar />
        </span>
      ));
      return stars;
    }
  };
  const fullStar = handleCreatingStars();
  const halfStarOrEmpty = createHalfStarOrEmpty();

  return (
    <p className="flex items-center gap-1">
      {fullStar}
      {halfStarOrEmpty}
      <span className="text-base text-stone-600 font-normal">{rating}</span>
    </p>
  );
};
interface ReviewProps {
  handleToggleReviews: (index: number) => void;

  activeIndices: number[];
}
//Doctor reviews list
const DoctorReviewsList = ({
  handleToggleReviews,
  activeIndices
}: ReviewProps) => {
  return (
    <div className="flex gap-5 flex-col">
      {patientReviews.slice(0, 5).map((review, index) => (
        <li
          className="shadow-shadow2 px-6 py-3 rounded-lg bg-gray-50"
          key={index}
        >
          <div className="flex gap-3 mb-4 border-b-2 pb-4 items-center">
            <div className="relative cursor-pointer w-12 h-12 min-w-12 min-h-12 md:w-12 md:h-12 rounded-full overflow-hidden">
              <Image
                src={review.photo}
                alt="Dr eman sem"
                fill
                sizes="100px"
                className="object-cover"
              />
            </div>
            <span className="text-xl text-stone-800 font-medium">Eman sem</span>
          </div>
          <div className="flex  mb-3  items-end gap-4">
            <CreatReviewStars rating={review.rating} />

            <span className="text-base text-text_color2">
              . {timeAgo(review.timeStamp)}
            </span>
          </div>
          <div className="text-base leading-6 text-text_color2 li md:text-[18px]">
            <p>
              {activeIndices.includes(index)
                ? `${review.details}`
                : `${review.details.slice(0, 150)}...`}
              <span
                onClick={() => handleToggleReviews(index)}
                className="text-[18px] text-primary_color hover:text-secondary_color cursor-pointer"
              >
                {activeIndices.includes(index) ? " Show less" : " Show more"}
              </span>
            </p>
          </div>
        </li>
      ))}
    </div>
  );
};

//Doctor reviews section
const ReviewSection = ({ activeIndices, handleToggleReviews }: ReviewProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2 mb-8 px-2">
        <PageHeading title="Reviews" />
      </div>

      <div>
        <DoctorReviewsList
          activeIndices={activeIndices}
          handleToggleReviews={handleToggleReviews}
        />
      </div>
      <div className="px-4 text-xl font-medium hover:text-secondary_color my-5 text-primary_color cursor-pointer">
        Show more reviews
      </div>
    </div>
  );
};

//Doctor main section
const AboutSection = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  items-start gap-4 ">
        <div className="relative cursor-pointer w-8 h-18 min-w-20 min-h-20  md:w-20 md:h-20 rounded-full overflow-hidden">
          <Image
            src="https://i.postimg.cc/026P6nxK/image.jpg"
            alt="Dr eman sem"
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xl text-stone-700  font-medium">Dr.Eman sem</p>
          <p className="text-base  text-text_color2 font-normal">
            Making Clients Reimagine Their Online Presence
          </p>
          <p className="flex gap-1">
            <Star fill="#facc15" color="#facc15" />
            <span className="text-stone-600"> 5.0(123)</span>
          </p>
        </div>
      </div>
      <div className="w-full bg-gray-50 rounded-md p-5">
        <ul className="w-full ">
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Country
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Cameroon
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Speciality
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Doctor
              </span>
            </p>
          </li>
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Years of experiences
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                16 Years
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Medical license
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                DOCTOREXAMPLE
              </span>
            </p>
          </li>
          <li className={Styles.aboutSectionList}>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Languages
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                English, French, German
              </span>
            </p>
            <p className={Styles.aboutSectionListItem}>
              <span className={`${Styles.aboutSectionListHeading}`}>
                Availiability
              </span>
              <span className={`${Styles.aboutSectionListSubheading}`}>
                Mon Tue ,Wed, Sat
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="text-xl text-stone-700 font-semibold">
          About Dr. Alex Rivers
        </h1>

        <p className="py-2 text-base leading-6 text-text_color2 li md:text-[18px]">
          My expertise lies in integrative medicine, where I blend traditional
          medical practices with holistic approaches to ensure comprehensive
          care. Trained at Johns Hopkins, with further specialization in
          neurology and functional medicine at Harvard, I&apos;ve seen
          first-hand the limitations of conventional treatments. This led me to
          explore and integrate alternative therapies like acupuncture, dietary
          therapy, and mindfulness, tailoring treatments to not only heal the
          body but also nurture the mind and spirit.
        </p>
      </div>
    </div>
  );
};
interface SubscriptionPlanHeaderType {
  getPlanType: (label: string) => void;
  subscriptionPlan?: SubscriptionPlan[];
  plan_type: string;
}

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

const SubscriptionPlanSection = () => {
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

function Page() {
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
}

export default Page;
