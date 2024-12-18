import ImageComponent from "@/src/components/utils/Image";
import { doctors } from "../page";
import { ChevronRight } from "lucide-react";
import { Card } from "@/src/components/utils/Card";

function DeskTopView() {
  return (
    <div className="hidden md:block">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="text-left py-4 px-6 text-stone-600 font-medium">
                  Doctor
                </th>
                <th className="text-left py-4 px-6 text-stone-600 font-medium">
                  Specialty
                </th>

                <th className="text-center py-4 px-6 text-stone-600 font-medium">
                  Country
                </th>
                <th className="text-center py-4 px-6 text-stone-600 font-medium">
                  state
                </th>
                <th className="text-center py-4 px-6 text-stone-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-stone-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <ImageComponent
                          imageUrl=""
                          altAttribute=""
                          imageStyle="w-10 h-10 min-w-10 min-h-10 rounded-full object-cover"
                        />
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full  ring-2 ring-white`}
                        ></span>
                      </div>
                      <div>
                        <span className="font-medium text-stone-800">
                          {doctor.name}
                        </span>
                        <p className="text-sm text-stone-500">
                          ID: {doctor.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {doctor.specialty}
                  </td>

                  <td className="py-4 px-6 text-center text-stone-600">
                    {doctor.responseTime}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium 
                         
                        `}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full 
                          }`}
                        ></span>
                        cameroon
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          (window.location.href = `/doctors/${doctor.id}`)
                        }
                        className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                      >
                        <ChevronRight size={20} className="text-stone-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default DeskTopView;
