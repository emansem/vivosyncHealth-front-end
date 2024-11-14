import { doctorProfile } from "@/data/doctorDemoData";
import { Mail, Phone, FileText, Languages } from "lucide-react";
import Image from "next/image";
import { Card, InfoItem, SectionTitle } from "./ReusableContent";

function PersonalInformation() {
  return (
    <div className="space-y-6">
      <Card>
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary_color mb-4">
            <Image
              src={doctorProfile.personal.photo}
              alt={doctorProfile.personal.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {doctorProfile.personal.name}
          </h1>
          <div className="mt-2 space-y-1">
            <span className="px-3 py-1 text-sm bg-primary_color/10 text-primary_color rounded-full">
              {doctorProfile.personal.specialization}
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <InfoItem icon={<Mail />} text={doctorProfile.personal.email} />
          <InfoItem icon={<Phone />} text={doctorProfile.personal.phone} />
          <InfoItem
            icon={<FileText />}
            text={`License: ${doctorProfile.personal.license}`}
          />
        </div>
      </Card>

      {/* Languages */}
      <Card>
        <SectionTitle icon={<Languages />} title="Languages" />
        <div className="flex flex-wrap gap-2 mt-4">
          {doctorProfile.languages.map((lang) => (
            <span
              key={lang}
              className="px-3 py-1 text-sm bg-gray-100 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default PersonalInformation;
