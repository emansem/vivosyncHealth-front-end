import { colors } from "@/app/lib/constant";
import ImageComponent from "@/src/components/utils/Image";
import { Camera } from "lucide-react";
import { useState } from "react";

// Personal Information Section
export const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium"
          style={{ color: colors.primary }}
        >
          {isEditing ? "Save Changes" : "Edit"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageComponent
              imageStyle="w-24 h-24 rounded-full"
              altAttribute="Profile"
              imageUrl=""
            />
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-stone-800">Profile Photo</h3>
            <p className="text-sm text-stone-500">
              JPG, GIF or PNG. Max size 2MB
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 000-0000"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              defaultValue="1990-01-01"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Address
          </label>
          <textarea
            rows={3}
            defaultValue="123 Medical Plaza, Suite 100, Health City, HC 12345"
            disabled={!isEditing}
            className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
          />
        </div>
      </div>
    </div>
  );
};
