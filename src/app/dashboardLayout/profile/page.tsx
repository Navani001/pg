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

  const workTypeOptions = ["Student", "Professional", "Freelancer", "Other"];

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
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Personal Details
      </h2>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 md:flex w-full justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">PG Details</h3>
          <p className="text-base text-gray-600">
            Assigned by admin. These details are read-only
          </p>
        </div>

        {/* PG Details */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isReadOnly
              label="PG Name"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900",
              }}
              defaultValue="MRM PG"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              label="Room Number"
              labelPlacement="outside"
              defaultValue="413-A"
              classNames={{
                label: "text-base text-gray-900",
              }}
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Location"
              defaultValue="Chennai"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900",
              }}
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Bed Type"
              defaultValue="2-Sharing"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900",
              }}
              className="w-full"
            />

            <Input
              isReadOnly
              labelPlacement="outside"
              label="Move-in date"
              defaultValue="August 10, 2025"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900",
              }}
              className="w-full"
            />

            <Input
              isReadOnly
              label="Monthly rent"
              labelPlacement="outside"
              defaultValue="₹8,500"
              classNames={{
                label: "text-base text-gray-900",
              }}
              variant="bordered"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-md">
        <h3 className="text-lg font-medium text-gray-900 border-b p-6">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-6">
          {/* Full Name */}
          <div className="flex flex-col justify-end">
            <Input
              variant="bordered"
              label="Full Name"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900",
                inputWrapper: "h-[40px]",
              }}
              placeholder="King"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col justify-end">
            <DatePicker
              label="Date of Birth"
              classNames={{
                label: "text-base text-gray-900",
                inputWrapper: "h-[40px]",
              }}
              variant="bordered"
              labelPlacement="outside"
            />
          </div>

          {/* Gender */}
          <div>
            <Select
              label="Gender"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Select gender"
              classNames={{
                label: "text-base text-gray-900",
                listboxWrapper: "border border-gray-300 rounded-lg",
              }}
              value={formData.gender}
            >
              <SelectItem
                key="Male"
                className="border-b border-gray-200 last:border-none px-3 py-2"
              >
                Male
              </SelectItem>
              <SelectItem
                key="Female"
                className="border-b border-gray-200 last:border-none px-3 py-2"
              >
                Female
              </SelectItem>
              <SelectItem key="Other" className="px-3 py-2">
                Other
              </SelectItem>
            </Select>
          </div>

          {/* Work Type */}
          <div>
            <Select
              label="Work Type"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Select work type"
              classNames={{
                label: "text-base text-gray-900",
                listboxWrapper: "border border-gray-300 rounded-lg",
              }}
              value={formData.workType}
            >
              {workTypeOptions.map((option, index) => (
                <SelectItem
                  key={option}
                  className={`border-b border-gray-200 px-3 py-2 ${
                    index === workTypeOptions.length - 1 ? "border-none" : ""
                  }`}
                >
                  {option}
                </SelectItem>
              ))}
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
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
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
              classNames={{
                label: "text-base text-gray-900",
              }}
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
              classNames={{
                label: "text-base text-gray-900",
              }}
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
              classNames={{
                label: "text-base text-gray-900",
              }}
              value={formData.emailAddress}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />

            {/* Address */}
            <Input
              type="text"
              classNames={{
                label: "text-base text-gray-900",
              }}
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
