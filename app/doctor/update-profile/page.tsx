"use client";

import UpdateDoctorFormField from "./_updateProfileContent/UpdateDoctorFormField";
import UpdateProfilePicture from "./_updateProfileContent/UpdateProfilePicture";

const DoctorUpdateProfile = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Profile Photo Section */}

        <UpdateProfilePicture />
        {/* Form Sections */}
        <UpdateDoctorFormField />

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-primary_color text-white rounded-lg hover:bg-primary_color/90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorUpdateProfile;
