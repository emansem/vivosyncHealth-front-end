import { Card } from "@/src/components/utils/Card";
import ImageComponent from "@/src/components/utils/Image";
import { Star, ChevronRight } from "lucide-react";
import { doctors } from "../page";

function MobileView() {
  return (
    <>
      <div className="md:hidden space-y-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ImageComponent
                    imageUrl=""
                    altAttribute=""
                    imageStyle="w-10 h-10 min-w-10 min-h-10 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                     ring-2 ring-white`}
                  ></span>
                </div>
                <div>
                  <h3 className="font-medium text-stone-800">{doctor.name}</h3>
                  <p className="text-sm text-stone-500">{doctor.specialty}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Rating</p>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Response Time</p>
                <p className="font-medium text-stone-700">
                  {doctor.responseTime}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-stone-500">Last Active</p>
                <p className="font-medium text-stone-700">
                  {doctor.lastActive}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <button
                onClick={() => (window.location.href = `/doctors/${doctor.id}`)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <ChevronRight size={20} className="text-stone-400" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default MobileView;
