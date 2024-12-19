"use client";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import ImageComponent from "@/src/components/utils/Image";
import { colors } from "@/app/lib/constant";
import { Camera } from "lucide-react";
import { useUpdateAndgetPatientProfile } from "@/src/hooks/admin/usePatients";
import { useParams } from "next/navigation";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";
import { formatDate } from "@/src/helper/helper";
import NoResults from "@/src/components/ui/noFound/EmptyResult";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
const USER_STATUS_OPTIONS = [
  {
    label: "Select Staus",
    value: ""
  },
  {
    label: "Active",
    value: "active"
  },
  {
    label: "Inactive",
    value: "inactive"
  }
];

const SinglePatientView = () => {
  const getPatientId = useParams();
  const patientId = getPatientId["patient_id"] as string;

  const {
    handleUpdatePatientPersonalInfo,
    transactions,
    isLoading,
    handlePhotoChange,
    previewImage,
    image,
    patientPersonalInfo,
    handleUpdateDetails,
    isPending
  } = useUpdateAndgetPatientProfile(patientId);

  if (isLoading) return <InnerPageLoader />;
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Patient Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-6">
              Personal Information
            </h2>
            <div className="mb-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ImageComponent
                    imageStyle="w-24 h-24 rounded-full"
                    altAttribute="Profile"
                    imageUrl={
                      previewImage ||
                      patientPersonalInfo.profile_photo ||
                      image ||
                      ""
                    }
                  />
                  <label>
                    <div
                      className="absolute cursor-pointer bottom-0 right-0 p-2 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <input
                      value={""}
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.name}
                inputType="text"
                name="name"
              />

              <Input
                label="Balance"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.balance}
                inputType="text"
                name="balance"
              />
              <Input
                label="Email"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.email}
                inputType="email"
                name="email"
              />
              <Input
                label="Phone"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.phone_number}
                inputType="tel"
                name="phone_number"
              />
              <Input
                label="Country"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.country}
                inputType="text"
                name="country"
              />

              <Input
                label="Date of Birth"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.date_of_birth}
                inputType="date"
                name="date_of_birth"
              />

              <div className="w-full space-x-3">
                <SelectInput
                  onChange={handleUpdatePatientPersonalInfo}
                  label="Change User Status"
                  value={patientPersonalInfo.status}
                  options={USER_STATUS_OPTIONS}
                  id="status"
                  name="status"
                />
              </div>
            </div>
            <Button
              onClick={handleUpdateDetails}
              disabled={isPending}
              className="w-full md:w-[50%] my-4"
            >
              {isPending ? <SubmittingLoader /> : "Save Changes"}
            </Button>
          </Card>
        </div>

        {/* Recent Activity and Transactions */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">
              Recent Transactions
            </h2>
            <div className="space-y-4">
              {transactions.length === 0 && (
                <NoResults
                  message="This patient doesn't have any transaction yet"
                  heading="No Transaction Found"
                />
              )}
              {transactions.length !== 0 &&
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium capitalize text-stone-800">
                        {transaction.type}
                      </p>
                      <p className="text-sm text-stone-500">
                        {formatDate(transaction.created_at as string)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-stone-800">
                        {transaction.amount.toFixed(2) || 0.0}
                      </p>
                      <p
                        className={`text-sm capitalize ${
                          transaction.status === "completed"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {transaction.status || "completed"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SinglePatientView;
