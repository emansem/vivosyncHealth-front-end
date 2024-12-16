"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import ImageComponent from "@/src/components/utils/Image";
import { colors } from "@/app/lib/constant";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  CreditCard,
  FileText,
  Clock,
  AlertCircle
} from "lucide-react";

// Gender options for select input
const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];

const SinglePatientView = () => {
  const [isPending, setIsPending] = useState(false);
  const [patientPersonalInfo, setPatientPersonalInfo] = useState({
    id: "P001",
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    gender: "male",
    date_of_birth: "1990-05-15",
    profile_photo: "/api/placeholder/96/96",
    address: "123 Main St, New York, NY",
    blood_type: "A+",
    emergency_contact: "+1 (555) 987-6543",
    medical_conditions: "None",
    status: "active"
  });

  // Handler for input changes
  const handleUpdatePatientPersonalInfo = (e) => {
    const { name, value } = e.target;
    setPatientPersonalInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = async () => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsPending(false);
    }
  };

  // Stats cards data
  const statsCards = [
    {
      title: "Total Visits",
      value: "24",
      icon: <Activity size={20} color={colors.primary} />,
      color: colors.primary
    },
    {
      title: "Last Visit",
      value: "2 days ago",
      icon: <Clock size={20} color="#2196F3" />,
      color: "#2196F3"
    },
    {
      title: "Outstanding Balance",
      value: "$150",
      icon: <CreditCard size={20} color="#F44336" />,
      color: "#F44336"
    }
  ];

  // Recent transactions data
  const recentTransactions = [
    {
      id: 1,
      date: "2024-03-15",
      type: "Consultation",
      amount: "$75",
      status: "completed"
    },
    {
      id: 2,
      date: "2024-03-10",
      type: "Laboratory Test",
      amount: "$150",
      status: "pending"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Patient Profile</h1>
        <Button onClick={handleSubmit} variant="primary" className="my-4">
          {isPending ? "Saving changes.." : "Save Changes"}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-sm font-medium">
                  {stat.title}
                </p>
                <h3
                  className="text-2xl font-bold mt-1"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </h3>
              </div>
              <div className="p-3 rounded-full bg-stone-50">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-6">
              Personal Information
            </h2>
            <div className="mb-6">
              <ImageComponent
                imageStyle="w-24 h-24 rounded-full"
                altAttribute="Profile"
                imageUrl={patientPersonalInfo.profile_photo}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.first_name}
                inputType="text"
                name="first_name"
              />
              <Input
                label="Last Name"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.last_name}
                inputType="text"
                name="last_name"
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
                value={patientPersonalInfo.phone}
                inputType="tel"
                name="phone"
              />
              <Input
                label="Country"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.country}
                inputType="text"
                name="country"
              />
              <SelectInput
                label="Gender"
                id="gender"
                value={patientPersonalInfo.gender}
                onChange={handleUpdatePatientPersonalInfo}
                name="gender"
                options={GENDER_OPTIONS}
              />
              <Input
                label="Date of Birth"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.date_of_birth}
                inputType="date"
                name="date_of_birth"
              />
              <Input
                label="Blood Type"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.blood_type}
                inputType="text"
                name="blood_type"
              />
              <Input
                label="Emergency Contact"
                onChange={handleUpdatePatientPersonalInfo}
                value={patientPersonalInfo.emergency_contact}
                inputType="tel"
                name="emergency_contact"
              />
              <div className="md:col-span-2">
                <Input
                  label="Address"
                  onChange={handleUpdatePatientPersonalInfo}
                  value={patientPersonalInfo.address}
                  inputType="text"
                  name="address"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Medical Conditions"
                  onChange={handleUpdatePatientPersonalInfo}
                  value={patientPersonalInfo.medical_conditions}
                  inputType="text"
                  name="medical_conditions"
                />
              </div>
            </div>
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
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-stone-800">
                      {transaction.type}
                    </p>
                    <p className="text-sm text-stone-500">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-stone-800">
                      {transaction.amount}
                    </p>
                    <p
                      className={`text-sm ${
                        transaction.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Medical Records Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">
              Medical Records
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-stone-400" />
                  <div>
                    <p className="font-medium text-stone-800">
                      Last Checkup Report
                    </p>
                    <p className="text-sm text-stone-500">March 15, 2024</p>
                  </div>
                </div>
                <Button variant="secondary">View</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-stone-400" />
                  <div>
                    <p className="font-medium text-stone-800">
                      Blood Test Results
                    </p>
                    <p className="text-sm text-stone-500">March 10, 2024</p>
                  </div>
                </div>
                <Button variant="secondary">View</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SinglePatientView;
