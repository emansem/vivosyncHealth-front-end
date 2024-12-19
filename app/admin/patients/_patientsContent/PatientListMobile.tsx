import { Card } from "@/src/components/utils/Card";
import { ChevronRight } from "lucide-react";
import { getStatusColor, patients } from "../page";

function PatientListMobile() {
  return (
    <div className="md:hidden space-y-4">
      {patients.map((patient) => (
        <Card key={patient.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={patient.photo}
                alt={patient.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-stone-800">{patient.name}</h3>
                <p className="text-sm text-stone-500">{patient.id}</p>
              </div>
            </div>
            <button
              onClick={() => (window.location.href = `/patients/${patient.id}`)}
              className="text-stone-400 hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Country</span>
              <span className="text-stone-700">{patient.country}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Join Date</span>
              <span className="text-stone-700">
                {new Date(patient.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500">Status</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                  getStatusColor(patient.status).bg
                } ${getStatusColor(patient.status).text}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    getStatusColor(patient.status).dot
                  }`}
                ></span>
                {patient.status.charAt(0).toUpperCase() +
                  patient.status.slice(1)}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default PatientListMobile;
