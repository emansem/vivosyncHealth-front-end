// Shared UI Components
import {
  Star,
  Globe2,
  Calendar,
  Languages,
  Stethoscope,
  Building2,
  Clock
} from "lucide-react";
import { THEME } from "../page";
import ImageComponent from "@/src/components/utils/Image";
import { UserType } from "@/src/hooks/serviceHook";

interface ProfileSectionProps {
  doctor: UserType;
}
export const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 rounded-lg bg-green-50">
      <Icon className="w-5 h-5" style={{ color: THEME.colors.primary }} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

export const ProfileSection = ({ doctor }: ProfileSectionProps) => (
  <div className="flex flex-col md:flex-row items-start gap-6">
    <div className="relative">
      <ImageComponent
        imageUrl={doctor?.profile_photo}
        imageStyle="w-24 h-24 min-h-24 min-w-24"
        altAttribute={doctor?.name}
      />
      {/* <div className="absolute -bottom-2 -right-2 bg-green-50 p-1.5 rounded-full">
        <Award className="w-5 h-5" style={{ color: THEME.colors.primary }} />
      </div> */}
    </div>
    <div className="flex-1">
      <h1 className="text-2xl font-semibold text-gray-900">{doctor?.name}</h1>
      {/* <p className="text-gray-600 mt-1">{doctorInfo.personalInfo.tagline}</p> */}
      <div className="flex flex-wrap items-center gap-4 mt-3">
        <div className="flex items-center">
          <Star
            className="w-5 h-5"
            style={{ color: THEME.colors.accent }}
            fill="currentColor"
          />
          <span className="ml-2 font-medium">{doctor?.rating}</span>
          <span className="text-gray-500 ml-1">
            ({doctor?.num_reviews || 0}){" "}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="ml-2 text-gray-600">
            {doctor?.years_of_experience} Years Experience
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const LocationGrid = ({ doctor }: ProfileSectionProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <InfoItem icon={Globe2} label="Country" value={doctor?.country} />
    <InfoItem icon={Building2} label="City" value={doctor?.city} />
    <InfoItem icon={Stethoscope} label="Specialty" value={doctor?.speciality} />
    <InfoItem icon={Languages} label="Languages" value={doctor?.languages} />
    <InfoItem icon={Calendar} label="Available" value={doctor?.working_days} />
  </div>
);
