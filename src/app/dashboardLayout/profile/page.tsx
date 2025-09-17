"use client";
import { Button, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";
import { RiFolderUserFill } from "react-icons/ri";

export default function PGBookingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "Male",
    workType: "Student",
    phoneNumber: "+91 9323464442",
    alternatePhone: "+91 9449543341",
    emailAddress: "king@example.com",
    address: "Street, City, State, PIN",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = () => {
    console.log("Updating personal details:", formData);
  };

  return (
    <div className="h-full w-full overflow-y-scroll scrollbar-hide">
      {/* Personal Details Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Details
          </h2>
        </div>

        {/* PG Details */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex w-full justify-between items-center">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              PG Details
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Assigned by admin. These details are read-only
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isReadOnly
              label="PG Name"
              labelPlacement="outside"
              defaultValue="MRM PG"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              label="Room Number"
              labelPlacement="outside"
              defaultValue="413-A"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Location"
              defaultValue="Chennai"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Bed Type"
              defaultValue="2-Sharing"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Move-in date"
              defaultValue="August 10, 2025"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              label="Monthly rent"
              labelPlacement="outside"
              defaultValue="₹8,500"
              variant="bordered"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-md">
        <h3 className="text-base font-medium text-gray-900 border-b p-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-6">
          {/* Full Name */}
          <Input
            variant="bordered"
            label="Full Name"
            labelPlacement="outside"
            placeholder="King"
          />

          {/* Date of Birth */}
          <DatePicker
            label="Date of Birth"
            variant="bordered"
            labelPlacement="outside"
          />

          {/* Gender */}
          <div>
            <Select
              label="Gender"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Select gender"
              value={formData.gender}
            >
              <SelectItem key="Male">Male</SelectItem>
              <SelectItem key="Female">Female</SelectItem>
              <SelectItem key="Other">Other</SelectItem>
            </Select>
          </div>

          {/* Work Type */}
          <div>
            <Select
              label="Work Type"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Select work type"
              value={formData.workType}
            >
              <SelectItem key="Student">Student</SelectItem>
              <SelectItem key="Professional">Professional</SelectItem>
              <SelectItem key="Freelancer">Freelancer</SelectItem>
              <SelectItem key="Other">Other</SelectItem>
            </Select>
            <p className="text-sm text-gray-600 mt-4">
              Work Type helps us understand your occupation (e.g., for routine
              rules or ID verification).
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">
            Contact Information
          </h3>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number */}
            <Input
              type="tel"
              name="phoneNumber"
              labelPlacement="outside"
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />

            {/* Alternate Phone */}
            <Input
              type="tel"
              labelPlacement="outside"
              name="alternatePhone"
              label="Alternate Phone Number"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />

            {/* Email Address */}
            <Input
              type="email"
              labelPlacement="outside"
              name="emailAddress"
              label="Email Address"
              value={formData.emailAddress}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />

            {/* Address */}
            <Input
              type="text"
              name="address"
              labelPlacement="outside"
              label="Address"
              value={formData.address}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end">
        <Button
          onPress={handleUpdateDetails}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <RiFolderUserFill />
          Update Personal Details
        </Button>
      </div>
    </div>
  );
}
