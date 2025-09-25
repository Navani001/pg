"use client";
import { getRequest, putRequest } from "@/utils";
import { Button, DatePicker, Input, Select, SelectItem } from "@heroui/react";
import { redirect } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { RiFolderUserFill } from "react-icons/ri";
import { CalendarDate, parseDate } from "@internationalized/date";
declare global {
  interface localStorage {

  }
}

export default function Profile() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: null as CalendarDate | null,
    gender: "Male",
    workType: "Student",
    phoneNumber: "+91 9323464442",
    alternatePhone: "+91 9449543341",
    emailAddress: "king@example.com",
    address: "Street, City, State, PIN",
    "pgName": "MRM Mens PG - 2",
    "roomNumber": "108",
    "pgLocation": "Thambaram",
    "dateOfJoining": null as CalendarDate | null,
    "monthlyRent": 7500,
    "advanceAmount": 0

  });

  // Helper function to convert ISO string to CalendarDate
  const convertISOToCalendarDate = (isoString: string): CalendarDate | null => {
    if (!isoString) return null;
    try {
      const date = new Date(isoString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // getMonth() returns 0-11
      const day = date.getDate();
      return new CalendarDate(year, month, day);
    } catch (error) {
      console.error("Error converting date:", error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    getRequest(`api/v1/user/profile`, { authorization: `Bearer ${token}` }).then((res: any) => {

      if (res && res.success !== false) {
        setFormData((prev) => ({
          ...prev,
          fullName: res.data.personalInfo.name || "",
          dateOfBirth: convertISOToCalendarDate(res.data.personalInfo.dob) || null,
          gender: res.data.personalInfo.gender || "Male",
          workType: res.data.personalInfo.workType || "Student",
          phoneNumber: res.data.contactInfo.phoneNo || "+91 9323464442",
          alternatePhone: res.data.contactInfo.alternatePhone || "+91 9449543341",
          emailAddress: res.data.contactInfo.email || "king@example.com",
          address: res.data.contactInfo.location || "Street, City, State, PIN",
          "pgName": res.data.pgDetails.pgName || "MRM Mens PG - 2",
          "roomNumber": res.data.pgDetails.roomNumber || "108",
          "pgLocation": res.data.pgDetails.pgLocation || "Thambaram",
          "dateOfJoining": convertISOToCalendarDate(res.data.pgDetails.dateOfJoining || "2025-09-18T14:11:26.711Z"),
          "monthlyRent": res.data.pgDetails.monthlyRent || 7500,
          "advanceAmount": res.data.pgDetails.advanceAmount || 0
        }));
      } else {
        redirect('/login')
      }
    });

  }, [])

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDetails = () => {
    const token = localStorage.getItem("token");

    putRequest(`api/v1/user/profile`, {
      "name": formData.fullName,
      "dob": formData.dateOfBirth ? formData.dateOfBirth.toString() : null,
      "phone": formData.phoneNumber,
      "location": formData.address,
      "work": formData.workType
    }, { authorization: `Bearer ${token}` })
  };

  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
      {/* Personal Details Section */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4 font-['Poppins']">
        Personal Details
      </h2>
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200 md:flex w-full justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 font-['Poppins']">PG Details</h3>
          <p className="text-base text-gray-600 font-['Poppins']">
            Assigned by admin. These details are read-only
          </p>
        </div>

        {/* PG Details */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              isReadOnly
              label="PG Name"
              value={formData.pgName}
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              defaultValue="MRM PG"
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              value={formData.roomNumber}
              label="Room Number"
              labelPlacement="outside"
              defaultValue="413-A"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              variant="bordered"
              className="w-full"
            />

            <Input
              isReadOnly
              value={formData.pgLocation}
              labelPlacement="outside"
              label="Location"
              defaultValue="Chennai"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              className="w-full"
            />

            <Input
              isReadOnly
              value={formData.advanceAmount+''}
              labelPlacement="outside"
              label="Advance Amount"
              defaultValue="2-Sharing"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              className="w-full"
            />

            {/* <Input
              isReadOnly
              value={formData.monthlyRent.toString()}
              labelPlacement="outside"
              label="Move-in date"
              defaultValue="August 10, 2025"
              variant="bordered"
              classNames={{
                label: "text-base text-gray-900",
              }}
              className="w-full"
            /> */}
            <DatePicker
              isReadOnly
              label="Date of Joining"
              value={formData.dateOfJoining}
              onChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date }))}
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
                inputWrapper: "h-[40px]",
              }}
              variant="bordered"
              labelPlacement="outside"
            />
            <Input
              isReadOnly
              value={`₹${formData.monthlyRent}`}
              label="Monthly rent"
              labelPlacement="outside"
              defaultValue="₹8,500"
              classNames={{
                base:"mt-3 pt-1",
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              variant="bordered"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6 shadow-md">
        <h3 className="text-lg font-medium text-gray-900 border-b p-6 font-['Poppins']">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-6">
          {/* Full Name */}
          <div className="flex flex-col justify-end">
            <Input
              name="fullName"
              value={formData.fullName}
              variant="bordered"
              label="Full Name"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
                inputWrapper: "h-[40px]",
              }}
              onChange={handleInputChange}
              placeholder="King"
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col justify-end">
            <DatePicker

              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date }))}
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
                inputWrapper: "h-[40px]",
              }}
              variant="bordered"
              labelPlacement="outside"
            />
          </div>

          {/* Gender */}
          <div>
            <Input
              name="Gender"
              value={formData.gender}
              variant="bordered"
              label="Gender"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
                inputWrapper: "h-[40px]",
              }}

            />
            {/* <Select
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
                key="MALE"
                className="border-b border-gray-200 last:border-none px-3 py-2"
              >
                Male
              </SelectItem>
              <SelectItem
                key="FEMALE"
                className="border-b border-gray-200 last:border-none px-3 py-2"
              >
                Female
              </SelectItem>
              <SelectItem key="OTHER" className="px-3 py-2">
                Other
              </SelectItem>
            </Select> */}
          </div>

          {/* Work Type */}
          <div>

            <Input
              name="workType"
              value={formData.workType}
              variant="bordered"
              label="Work Type"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
                inputWrapper: "h-[40px]",
              }}
              onChange={handleInputChange}
              placeholder="IT"
            />
            {/* <Select
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
                  className={`border-b border-gray-200 px-3 py-2 ${index === workTypeOptions.length - 1 ? "border-none" : ""
                    }`}
                >
                  {option}
                </SelectItem>
              ))}
            </Select> */}
            <p className="text-sm text-gray-600 mt-4 font-['Poppins']">
              Work Type helps us understand your occupation (e.g., for routine
              rules or ID verification).
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 font-['Poppins']">
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
                label: "text-base text-gray-900 font-['Poppins']",
              }}
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              variant="bordered"
              className="w-full"
            />

            {/* Alternate Phone */}
            {/* <Input
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
            /> */}

            {/* Email Address */}
            <Input
              type="email"
              labelPlacement="outside"
              name="emailAddress"
              label="Email Address"
              classNames={{
                label: "text-base text-gray-900 font-['Poppins']",
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
                label: "text-base text-gray-900 font-['Poppins']",
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
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-['Poppins']"
        >
          <RiFolderUserFill />
          Update Personal Details
        </Button>
      </div>
    </div>
  );
}
