"use client";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Stethoscope,
  Calendar,
  Award,
  Languages,
  UserCircle,
  Building2,
  GraduationCap,
  FileText
} from "lucide-react";
import Image from "next/image";

// Card wrapper - keeps our design consistent
const Card = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const DoctorInternalProfile = () => {
  // Mock data - replace with your Redux data
  const doctorProfile = {
    personal: {
      name: "Dr. Sarah Johnson",
      photo: "/api/placeholder/150/150",
      email: "dr.sarah@medical.com",
      phone: "+1 234-567-8900",
      specialization: "Cardiologist",
      experience: "15 years",
      license: "MED-2024-123456"
    },
    professional: {
      hospital: "Central Medical Center",
      address: "123 Medical Drive, NYC",
      department: "Cardiology",
      position: "Senior Cardiologist",
      yearsInHospital: "8 years"
    },
    qualifications: {
      education: [
        "MD in Cardiology - Harvard Medical School",
        "Residency - Mayo Clinic",
        "Fellowship - Johns Hopkins Hospital"
      ],
      certifications: [
        "American Board of Internal Medicine",
        "Advanced Cardiac Life Support (ACLS)",
        "Basic Life Support (BLS)"
      ]
    },
    schedule: {
      regularHours: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
      consultationTime: "30 minutes",
      emergencyAvailable: true
    },
    skills: [
      "Cardiac Catheterization",
      "Echocardiography",
      "Stress Testing",
      "Preventive Cardiology"
    ],
    languages: ["English", "Spanish", "French"],
    stats: {
      totalPatients: "1,200+",
      successRate: "98%",
      experience: "15 years",
      surgeries: "500+"
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(doctorProfile.stats).map(([key, value]) => (
          <Card key={key} className="text-center">
            <h3 className="text-xl font-bold text-primary_color">{value}</h3>
            <p className="text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, " $1")}
            </p>
          </Card>
        ))}
      </div>

      {/* Main Profile Section */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Personal Info */}
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

        {/* Middle Column - Professional Info */}
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

        {/* Right Column - Qualifications */}
        <div className="space-y-6">
          {/* Education */}
          <Card>
            <SectionTitle
              icon={<GraduationCap />}
              title="Education & Certifications"
            />
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-2">Education</h3>
                <ul className="space-y-2">
                  {doctorProfile.qualifications.education.map((edu, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary_color rounded-full"></div>
                      <span className="text-gray-600">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Certifications</h3>
                <ul className="space-y-2">
                  {doctorProfile.qualifications.certifications.map(
                    (cert, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary_color rounded-full"></div>
                        <span className="text-gray-600">{cert}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card>
            <SectionTitle icon={<Award />} title="Specializations & Skills" />
            <div className="flex flex-wrap gap-2 mt-4">
              {doctorProfile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm border border-primary_color/30 text-primary_color rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const SectionTitle = ({
  icon,
  title
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="flex items-center gap-2">
    <div className="text-primary_color">{icon}</div>
    <h2 className="text-lg font-semibold">{title}</h2>
  </div>
);

const InfoItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <div className="text-primary_color">{icon}</div>
    <span>{text}</span>
  </div>
);

export default DoctorInternalProfile;
