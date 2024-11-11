"use client";
import Image from "next/image";
import Input from "../ui/forms/Input";
import { demoPatientChats } from "@/data/demoChartUsers";
interface MessageSideBarProps {
  getUserId: (id: number) => void;
}

function MessageSidBar({ getUserId }: MessageSideBarProps) {
  return (
    <div className="relative">
      <div className="sticky top-0 z-20 bg-white w-full">
        <Input inputType={"text"} inputPlaceholder="Search doctor by name" />
      </div>
      <div>
        <ul className="flex flex-col ">
          {demoPatientChats.map((patient) => (
            <li
              onClick={() => getUserId(patient.id)}
              key={patient.id}
              className="flex items-center gap-3 mt-3 p-2 rounded-lg hover:bg-light_color cursor-pointer"
            >
              <div className="relative cursor-pointer bg-primary_color w-12 h-12 min-h-12 min-w-12  md:w-12 md:h-12 rounded-full overflow-hidden">
                <Image
                  src={patient.image_url}
                  alt="Dr eman sem"
                  fill
                  sizes="70px"
                  className="object-cover"
                />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-stone-700 font-medium text-base md:text-[18px] truncate">
                    {patient.name}
                  </span>
                  <span className="text-sm text-secondary_color flex-shrink-0">
                    {patient.time}
                  </span>
                </div>
                <p className="text-text_color2 text-sm truncate">
                  {patient.recent_message.slice(0, 24)}...
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageSidBar;
