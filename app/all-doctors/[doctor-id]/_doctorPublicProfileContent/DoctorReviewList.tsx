import { ReviewProps } from "@/app/lib/types";
import { patientReviews } from "@/data/demoPatientReviews";
import timeAgo from "@/src/helper/timeAgo";
import Image from "next/image";
import { CreatReviewStars } from "./CreateReviewStars";
export const DoctorReviewsList = ({
  handleToggleReviews,
  activeIndices
}: ReviewProps) => {
  return (
    <div className="flex gap-5 flex-col">
      {patientReviews.slice(0, 5).map((review, index) => (
        <li className="shadow-shadow3 px-6 py-3 rounded-lg " key={index}>
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
