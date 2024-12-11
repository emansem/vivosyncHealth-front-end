// import { ReviewProps } from "@/app/lib/types";
// import { PageHeading } from "@/src/components/ui/layout/CardLayout";
// import { DoctorReviewsList } from "./DoctorReviewList";
import { Star } from "lucide-react";
import { THEME } from "../page";

export const ReviewSection = () => {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Patient Reviews</h2>
        <button className="text-primary font-medium hover:underline">
          View all
        </button>
      </div>
      <div className="space-y-6">
        {/* TODO: Map through actual reviews */}
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <span
              className="font-medium"
              style={{ color: THEME.colors.primary }}
            >
              ES
            </span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium">Eman sem</span>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  style={{ color: THEME.colors.accent }}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="mt-2 text-gray-600">
              Dr. Anderson was incredibly thorough during my annual check-up.
              She took the time to explain all my test results in detail and
              answered every question...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
