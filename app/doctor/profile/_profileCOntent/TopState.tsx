"use client";

import { doctorProfile } from "@/data/doctorDemoData";
import { Card } from "./ReusableContent";

function TopState() {
  return (
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
  );
}

export default TopState;
