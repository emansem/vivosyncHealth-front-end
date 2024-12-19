import { Card } from "@/src/components/utils/Card";
import { ChevronRight } from "lucide-react";
import { getStatusColor } from "../page";
import { UserType } from "@/src/hooks/serviceHook";
import PaginationButton from "@/src/components/utils/table/Pagination";
import { formatDate } from "@/src/helper/helper";
import ImageComponent from "@/src/components/utils/Image";
interface PatientListDesktopProps {
  patients: UserType[];
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  startIndex: number;
  pages: number[];
}
const tableHeaders = [
  {
    label: "Patient",
    value: "patient",
    align: "text-left"
  },
  {
    label: "ID",
    value: "id",
    align: "text-left"
  },
  {
    label: "Country",
    value: "country",
    align: "text-left"
  },
  {
    label: "Join Date",
    value: "joinDate",
    align: "text-left"
  },
  {
    label: "Status",
    value: "status",
    align: "text-left"
  },
  {
    label: "Actions",
    value: "actions",
    align: "text-left"
  }
];

function PatientListDesktop({
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,
  totalResult,
  patients,
  getPageNumber,
  pageNumber
}: PatientListDesktopProps) {
  return (
    <div className="hidden md:block">
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
              {patients.map((patient, index) => (
                <tr key={index} className="hover:bg-stone-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <ImageComponent
                        imageUrl={patient.profile_photo as string}
                        altAttribute={patient.name}
                        imageStyle="w-10 h-10 min-w-10 min-h-10 rounded-full object-cover"
                      />
                      <span className="font-medium text-stone-800">
                        {patient.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {patient.user_id}
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {patient.country}
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {formatDate(patient.created_at as string)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        getStatusColor(patient.status as string).bg
                      } ${getStatusColor(patient.status as string).text}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 caret-purple-50 rounded-full ${
                          getStatusColor(patient.status as string).dot
                        }`}
                      ></span>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() =>
                        (window.location.href = `/patients/${patient.user_id}`)
                      }
                      className="text-stone-400 hover:text-primary transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
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

export default PatientListDesktop;
