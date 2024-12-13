import { UserType } from "@/src/hooks/serviceHook";
import DesktopCardLayout from "./DesktopCardLayout";
import MobileCardLayout from "./MobileCardLayout";

// Type definitions for better type safety and documentation
export interface Doctor {
  id: string;
  name: string;
  title: string;
  licenseNo: string;
  rating: number;
  reviews: number;
  yearsExperience: number;
  consultations: number;
  imageUrl: string;
  isOnline?: boolean;
  specialties: string[];
}

// Component for individual doctor cards with responsive design
export const DoctorCard: React.FC<{ doctor: UserType; isMobile: boolean }> = ({
  doctor
}) => {
  // Mobile layout version of the card
  return (
    <>
      <div className="md:hidden">
        <MobileCardLayout doctor={doctor} />
      </div>
      <div className="hidden md:block">
        <DesktopCardLayout doctor={doctor} />
      </div>
    </>
  );
};
