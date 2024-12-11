"use client";

import { useUpdateDoctorProfile } from "@/src/hooks/useDoctorProfile";
import UpdateDoctorFormField from "./_updateProfileContent/UpdateDoctorFormField";
import UpdateProfilePicture from "./_updateProfileContent/UpdateProfilePicture";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

const DoctorUpdateProfile = () => {
  const {
    profileData,
    previewImage,
    handlePhotoChange,
    submitDoctorUpdateForm,
    isPending,
    updateProfileField
  } = useUpdateDoctorProfile();
  const profilePicture = profileData.profile_photo as string;
  console.log(profileData.about);
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Profile Photo Section */}

        <UpdateProfilePicture
          previewImage={previewImage}
          handlePhotoOnchange={handlePhotoChange}
          profile_photo={profilePicture}
        />
        {/* Form Sections */}
        <UpdateDoctorFormField
          updateProfileField={updateProfileField}
          profileData={profileData}
        />

        {/* Action Buttons */}

        <div className="flex justify-end gap-4">
          <PrimaryButton
            onClick={submitDoctorUpdateForm}
            backgroud
            color="text-white"
          >
            {isPending ? "Saving...." : "Save Details"}
          </PrimaryButton>
          {/* <button
            onClick={submitDoctorUpdateForm}
            className="px-6 py-2 bg-primary_color text-white rounded-lg hover:bg-primary_color/90"
          >
            Save Changes
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorUpdateProfile;
