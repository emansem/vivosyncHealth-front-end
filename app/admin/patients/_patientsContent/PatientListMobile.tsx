import { Card } from "@/src/components/utils/Card";
import { ChevronRight } from "lucide-react";
import { getStatusColor } from "../page";
import { UserType } from "@/src/hooks/serviceHook";
import ImageComponent from "@/src/components/utils/Image";
import { formatDate } from "@/src/helper/helper";
import Link from "next/link";
interface PatientListMobileProps {
  patients: UserType[];
}

function PatientListMobile({ patients }: PatientListMobileProps) {
  return (
    <div className="md:hidden space-y-4">
      {patients.map((patient) => (
        <Card key={patient.user_id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <ImageComponent
                imageUrl={patient.profile_photo as string}
                altAttribute={patient.name}
                imageStyle="w-10 h-10 min-w-10 min-h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-stone-800">{patient.name}</h3>
                <p className="text-sm text-stone-500">{patient.user_id}</p>
              </div>
            </div>
            <Link
              href={`/admin/patients/${patient.user_id}`}
              className="inline-flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ChevronRight
                className="text-gray-400 hover:text-blue-600 transition-colors"
                size={20}
              />
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Country</span>
              <span className="text-stone-700">{patient.country}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Join Date</span>
              <span className="text-stone-700">
                {formatDate(patient.created_at as string)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  getStatusColor(patient.status as string).bg
                } ${getStatusColor(patient.status as string).text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    getStatusColor(patient.status as string).dot
                  }`}
                ></span>
                {patient.status}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default PatientListMobile;
