import { colors, GENDER_OPTIONS } from "@/app/lib/constant";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import LoadingState from "@/src/components/ui/loading/LoadingState";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
import { Button } from "@/src/components/utils/Button";
import ImageComponent from "@/src/components/utils/Image";
import { useUpdatePatientPersonalInfo } from "@/src/hooks/patient/usePatientProfile";
import { Camera } from "lucide-react";

// Personal Information Section
export const PersonalInfoSection = () => {
  const {
    handleUpdatePatientPersonalInfo,
    handlePhotoChange,
    handleSubmit,
    isLoading,
    isPending,
    previewImage,
    patientPersonalInfo
  } = useUpdatePatientPersonalInfo();
  if (isLoading) return <LoadingState />;

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Personal Information
        </h2>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageComponent
              imageStyle="w-24 h-24 rounded-full"
              altAttribute="Profile"
              imageUrl={previewImage || patientPersonalInfo.profile_photo || ""}
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

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Full Name"
              value={patientPersonalInfo?.name || ""}
              inputType="text"
              name="name"
              onChange={handleUpdatePatientPersonalInfo}
            />
          </div>

          <div>
            <Input
              label="Phone Number"
              value={patientPersonalInfo?.phone_number || ""}
              inputType="phone"
              name="phone_number"
              onChange={handleUpdatePatientPersonalInfo}
            />
          </div>
          <div>
            <Input
              label="Country"
              onChange={handleUpdatePatientPersonalInfo}
              value={patientPersonalInfo?.country || ""}
              inputType="text"
              name="country"
            />
          </div>

          <div>
            <Input
              label="State"
              value={patientPersonalInfo?.state || ""}
              inputType="text"
              name="state"
              onChange={handleUpdatePatientPersonalInfo}
            />
          </div>
          <div>
            <Input
              label="City"
              value={patientPersonalInfo?.city || ""}
              inputType="text"
              name="city"
              onChange={handleUpdatePatientPersonalInfo}
            />
          </div>
          <div>
            <Input
              label="Date Of Birth"
              value={patientPersonalInfo?.date_of_birth || ""}
              inputType="date"
              onChange={handleUpdatePatientPersonalInfo}
              name="date_of_birth"
            />
          </div>
          <div>
            <SelectInput
              label="Gender"
              id="gender"
              value={patientPersonalInfo?.gender}
              onChange={handleUpdatePatientPersonalInfo}
              name="gender"
              options={GENDER_OPTIONS}
            />
          </div>
        </div>
      </div>
      <Button onClick={handleSubmit} className="my-4" variant="primary">
        {isPending ? (
          <SubmittingLoader text="Saving changes.." />
        ) : (
          " Save Changes"
        )}
      </Button>
    </div>
  );
};
