import { ReviewProps } from "@/app/lib/types";
import { PageHeading } from "@/src/components/ui/layout/CardLayout";
import { DoctorReviewsList } from "./DoctorReviewList";

export const ReviewSection = ({
  activeIndices,
  handleToggleReviews
}: ReviewProps) => {
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
