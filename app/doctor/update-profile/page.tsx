"use client";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";

const DoctorUpdateProfile = () => {
  const [previewImage, setPreviewImage] = useState<string>("");

  // Handle Profile Photo Change
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Update Profile</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary_color">
              <Image
                src={previewImage || "/api/placeholder/150/150"}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-primary_color rounded-full text-white cursor-pointer hover:bg-primary_color/90">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">
            Click the camera icon to update your profile photo
          </p>
        </div>

        {/* Form Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Personal Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="Dr. John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="doctor@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="+1234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="English, Spanish"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Professional Information</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="Cardiologist"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Medical License Number
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="ML123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hospital/Clinic
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                placeholder="Central Hospital"
              />
            </div>
          </div>

          {/* About Section - Full Width */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">About</h2>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color min-h-[100px]"
              placeholder="Write a brief description about yourself and your practice..."
            />
          </div>

          {/* Working Hours - Full Width */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-semibold text-lg">Working Hours</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Days
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                  placeholder="Monday - Friday"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary_color focus:border-primary_color"
                  placeholder="9:00 AM - 5:00 PM"
                />
              </div>
            </div>
          </div>
        </div>

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
