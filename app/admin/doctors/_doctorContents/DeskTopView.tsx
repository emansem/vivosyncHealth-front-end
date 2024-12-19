import ImageComponent from "@/src/components/utils/Image";
import { ChevronRight } from "lucide-react";
import { Card } from "@/src/components/utils/Card";
import { UserType } from "@/src/hooks/serviceHook";
import PaginationButton from "@/src/components/utils/table/Pagination";
const tableHeaders = [
  {
    label: "Doctor",
    value: "doctor",
    align: "text-left"
  },
  {
    label: "Specialty",
    value: "specialty",
    align: "text-left"
  },
  {
    label: "Country",
    value: "country",
    align: "text-center"
  },
  {
    label: "state",
    value: "state",
    align: "text-center"
  },
  {
    label: "Actions",
    value: "actions",
    align: "text-center"
  }
];
interface DeskTopViewProps {
  doctors: UserType[];
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  startIndex: number;
  pages: number[];
}

function DeskTopView({
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,
  totalResult,
  getPageNumber,
  pageNumber,
  doctors
}: DeskTopViewProps) {
  return (
    <div className="">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header.value}
                    className={`py-4 px-6 text-stone-600 font-medium ${header.align}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {doctors?.map((doctor, index) => (
                <tr key={index} className="hover:bg-stone-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <ImageComponent
                          imageUrl={doctor.profile_photo}
                          altAttribute={doctor.name}
                          imageStyle="w-10 h-10 min-w-10 min-h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium capitalize text-stone-800">
                          {doctor.name}
                        </span>
                        <p className="text-sm text-stone-500">
                          ID: {doctor.user_id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 capitalize text-stone-600">
                    {doctor.speciality}
                  </td>

                  <td className="py-4 px-6 text-center text-stone-600">
                    {doctor.country}
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
                        {doctor.state}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() =>
                          (window.location.href = `/doctors/${doctor.user_id}`)
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
        {totalResult >= 11 && (
          <div className="p-6">
            <PaginationButton
              pageNumber={pageNumber}
              totalResult={totalResult}
              result={endIndex}
              handlePrevButton={handlePrevButton}
              handleNextButton={handleNextButton}
              getPageNumber={getPageNumber}
              pages={pages}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default DeskTopView;
