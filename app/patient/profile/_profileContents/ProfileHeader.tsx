import { colors } from "@/app/lib/constant";
import ImageComponent from "@/src/components/utils/Image";
import { UserType } from "@/src/hooks/serviceHook";
import { Settings } from "lucide-react";
interface ProfileHeaderProps {
  patienData: UserType;
}

export const ProfileHeader = ({ patienData }: ProfileHeaderProps) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 bg-white rounded-3xl">
    <div className="flex items-center gap-4">
      <ImageComponent
        imageStyle="w-20 h-20 min-h-20 min-w-20"
        altAttribute={patienData.name}
        imageUrl={patienData.profile_photo}
      />
      <div>
        <h1 className="text-2xl font-bold capitalize text-stone-800">
          {patienData.name}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <p className="text-stone-500 text-sm">ID: {patienData.user_id}</p>
          <span className="hidden sm:block text-stone-300">•</span>
          <p className="text-stone-500 text-sm">
            Member since {new Date(patienData.created_at as Date).getFullYear()}
          </p>
        </div>
      </div>
    </div>

    <button
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition-colors hover:bg-secondary"
      style={{ borderColor: colors.primary, color: colors.primary }}
    >
      <Settings className="w-4 h-4" />
      Edit profile
    </button>
  </div>
);
