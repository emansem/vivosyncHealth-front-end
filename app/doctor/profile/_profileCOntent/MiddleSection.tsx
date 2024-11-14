import { doctorProfile } from "@/data/doctorDemoData";
import { Building2, MapPin, UserCircle, Clock, Calendar } from "lucide-react";
import { Card, SectionTitle, InfoItem } from "./ReusableContent";

function MiddleSection() {
  return (
    <div className="space-y-6">
      {/* Hospital Info */}
      <Card>
        <SectionTitle icon={<Building2 />} title="Hospital Information" />
        <div className="space-y-3 mt-4">
          <InfoItem
            icon={<MapPin />}
            text={doctorProfile.professional.hospital}
          />
          <InfoItem
            icon={<MapPin />}
            text={doctorProfile.professional.address}
          />
          <InfoItem
            icon={<UserCircle />}
            text={`Position: ${doctorProfile.professional.position}`}
          />
          <InfoItem
            icon={<Clock />}
            text={`Time in Hospital: ${doctorProfile.professional.yearsInHospital}`}
          />
        </div>
      </Card>

      {/* Schedule */}
      <Card>
        <SectionTitle icon={<Calendar />} title="Working Schedule" />
        <div className="space-y-3 mt-4">
          {doctorProfile.schedule.regularHours.map((time, index) => (
            <InfoItem key={index} icon={<Clock />} text={time} />
          ))}
          <InfoItem
            icon={<Clock />}
            text={`Consultation Time: ${doctorProfile.schedule.consultationTime}`}
          />
        </div>
      </Card>
    </div>
  );
}

export default MiddleSection;
