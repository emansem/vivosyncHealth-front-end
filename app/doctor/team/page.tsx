"use client";

import { Calendar, Star, UserCheck } from "lucide-react";

import { teamMembers } from "@/data/teamDemoData";
import { TeamMemberCard } from "./_teamContent/TeamMemberCard";
import { StatCard } from "./_teamContent/StateCard";

const TeamPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Doctors"
          value="45"
          icon={<UserCheck className="w-5 h-5" />}
        />
        <StatCard
          title="Active Today"
          value="28"
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Top Rated"
          value="15"
          icon={<Star className="w-5 h-5" />}
        />
        <StatCard
          title="New This Month"
          value="8"
          icon={<UserCheck className="w-5 h-5" />}
        />
      </div>

      {/* Search and Filter */}

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
