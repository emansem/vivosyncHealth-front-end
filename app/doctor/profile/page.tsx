"use client";
import { doctorProfile } from "@/data/doctorDemoData";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Award,
  Languages,
  UserCircle,
  Building2,
  FileText
} from "lucide-react";

import {
  Card,
  InfoItem,
  SectionTitle
} from "./_profileCOntent/ReusableContent";
import TopState from "./_profileCOntent/TopState";
import PersonalInformation from "./_profileCOntent/PersonalInformation";
import MiddleSection from "./_profileCOntent/MiddleSection";
import SkillsSection from "./_profileCOntent/SkillsSection";

const DoctorInternalProfile = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Top Stats Bar */}
      <TopState />
      {/* Main Profile Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
        <PersonalInformation />
        {/* Middle Column - Professional Info */}
        <MiddleSection />

        {/* Right Column - Qualifications */}
        <div className="space-y-6">
          {/* Education */}

          {/* Skills */}
          <SkillsSection />
        </div>
      </div>
    </div>
  );
};

export default DoctorInternalProfile;
