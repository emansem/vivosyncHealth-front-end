"use client";

import { subscriptionData } from "@/data/patientlist";
import { PATIENT_FIELDS } from "@/data/table";
import MobileTable from "@/src/components/utils/table/MobileTable";

import { TableTabArea } from "./_patientListContent/FilterArea";
import { DesktopTable } from "./_patientListContent/TableDeskTopVersion";
import { Patient, PatientField } from "@/src/types/general";
interface MobileTableProps {
  data: Patient[];
  fields: PatientField[];
}

function PatientList() {
  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <TableTabArea />
      </div>
      <div className="hidden md:block">
        <DesktopTable />
      </div>
      <div className="md:hidden">
        <MobileTable<Patient> fields={PATIENT_FIELDS} data={subscriptionData} />
      </div>
    </div>
  );
}

export default PatientList;
