import {
  colors,
  DoctorBasicInformation,
  DoctorContactInformation
} from "@/app/lib/constant";
import Input from "@/src/components/ui/forms/Input";
import TextArea from "@/src/components/ui/forms/TextArea";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
import { Button } from "@/src/components/utils/Button";
import ImageComponent from "@/src/components/utils/Image";
import { useUpdateDoctorProfile } from "@/src/hooks/useDoctorProfile";
import { Camera } from "lucide-react";

export const ProfileSection = () => {
  const {
    profileData,
    previewImage,
    handlePhotoChange,
    isPending,
    isLoading,
    submitDoctorUpdateForm,
    updateProfileField
  } = useUpdateDoctorProfile();

  if (isLoading) return <LoadingState />;
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Professional Profile
        </h2>
        <Button
          onClick={submitDoctorUpdateForm}
          disabled={isPending}
          variant="outline"
        >
          {isPending ? <SubmittingLoader text="Saving..." /> : "Save Changes"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageComponent
              imageStyle="w-24 h-24 rounded-full"
              altAttribute="Profile"
              imageUrl={previewImage || profileData.profile_photo || ""}
            />
            <label>
              <div
                className="absolute cursor-pointer bottom-0 right-0 p-2 rounded-full"
                style={{ backgroundColor: colors.primary }}
              >
                <Camera className="w-4 h-4 text-white" />
              </div>
              <input
                onChange={handlePhotoChange}
                type="file"
                hidden
                name="profile_photo"
                accept="image/*"
              />
            </label>
          </div>
          <div>
            <h3 className="font-medium text-stone-800">Profile Photo</h3>
            <p className="text-sm text-stone-500">
              JPG, GIF or PNG. Max size 2MB
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DoctorBasicInformation.map((item, index) => (
            <div key={index}>
              <Input
                name={item.name}
                id={item.name}
                label={item.label}
                onChange={updateProfileField}
                value={profileData[item.name]}
                inputType={item.type}
                inputPlaceholder={item.placeholder}
              />
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DoctorContactInformation.map((item, index) => (
            <div key={index}>
              <Input
                name={item.name}
                id={item.name}
                label={item.label}
                onChange={updateProfileField}
                value={profileData[item.name]}
                inputType={item.type}
                inputPlaceholder={item.placeholder}
              />
            </div>
          ))}
        </div>

        {/* Professional Bio */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Professional Biography
          </label>
          <TextArea
            name="about"
            id="about"
            value={profileData["about"]}
            onChange={updateProfileField}
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Languages Spoken
          </label>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-600">
              {profileData.languages}
            </span>

            {/* {isEditing && (
              <button className="px-3 py-1 rounded-full text-sm border border-dashed border-stone-300 text-stone-500">
                + Add Language
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
