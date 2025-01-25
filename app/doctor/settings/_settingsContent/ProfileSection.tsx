import { colors } from "@/app/lib/constant";
import ImageComponent from "@/src/components/utils/Image";
import { Camera } from "lucide-react";
import { useState } from "react";

export const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Professional Profile
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
              Professional headshot recommended
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Dr. John Smith"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Specialization
            </label>
            <input
              type="text"
              defaultValue="Cardiologist"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              License Number
            </label>
            <input
              type="text"
              defaultValue="MD12345"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              defaultValue="15"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="dr.smith@example.com"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Office Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Medical Center Drive, Suite 100, City, State 12345"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>
          </div>
        </div>

        {/* Professional Bio */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Professional Biography
          </label>
          <textarea
            rows={6}
            defaultValue="Board-certified cardiologist with over 15 years of experience..."
            disabled={!isEditing}
            className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Languages Spoken
          </label>
          <div className="flex flex-wrap gap-2">
            {["English", "Spanish", "French"].map((lang, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-600"
              >
                {lang}
              </span>
            ))}
            {isEditing && (
              <button className="px-3 py-1 rounded-full text-sm border border-dashed border-stone-300 text-stone-500">
                + Add Language
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
