import { doctorProfile } from "@/data/doctorDemoData";
import { Award } from "lucide-react";
import { Card, SectionTitle } from "./ReusableContent";

function SkillsSection() {
  return (
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
  );
}

export default SkillsSection;
