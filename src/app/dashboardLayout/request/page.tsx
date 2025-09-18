"use client";
import { Button, DatePicker, Select, SelectItem, Textarea } from "@heroui/react";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Request() {
  const [formData, setFormData] = useState({
    leaveDate: "",
    reason: "Job transfer",
    feedback: "",
    confirmTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(true);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    if (formData.confirmTerms && formData.leaveDate) {
      setIsSubmitted(true);
    }
  };

  const reasonOptions = [
    "Job transfer",
    "Personal reasons",
    "Family emergency",
    "Health issues",
    "Education",
    "Other",
  ];

  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Releave Request Details
      </h1>
      <p className="text-gray-600 mb-6">
        Please fill out this form if you are planning to leave the PG. The
        management team will review and process your request accordingly.
      </p>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Request Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            {/* 
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Planned Leave Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    required
                  />
                  <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
               */}
            {/* Planned Leave Date */}
            <DatePicker
              label="Planned Leave Date"
              variant="bordered"
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900",
              }}
            />

            {/* Reason for leaving */}
            <Select
              label="Reason for leaving"
              variant="bordered"
              labelPlacement="outside"
              placeholder="Select Reason"
              value={formData.reason}
              onChange={handleInputChange}
              classNames={{
                label: "text-base text-gray-900",
                listboxWrapper: "border border-gray-300 rounded-lg",
              }}
            >
              {reasonOptions.map((option, index) => (
                <SelectItem
                  key={option}
                  className={`border-b border-gray-200 px-3 py-2 ${
                    index === reasonOptions.length - 1 ? "border-none" : ""
                  }`}
                >
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>

          {/* Feedback */}
          <Textarea
            variant="bordered"
            label="Feedback (Optional)"
            labelPlacement="outside"
            placeholder="Please share your feedback about your stay..."
            classNames={{
              label: "text-base text-gray-900",
            }}
          />
        </div>

        {/* Terms and Conditions */}
        <div className="bg-red-100 rounded-lg p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                name="confirmTerms"
                checked={formData.confirmTerms}
                onChange={handleInputChange}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  formData.confirmTerms
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300 bg-white"
                }`}
              >
                {formData.confirmTerms && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
            </div>
            <span className="text-sm text-gray-700 leading-relaxed">
              I confirm that I intend to vacate my room and agree to the terms &
              conditions of the PG.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onPress={handleSubmit}
            className="px-6 py-3 rounded-lg font-medium transition-colors bg-red-500 hover:bg-red-600 text-white "
          >
            Submit Leave Request
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {isSubmitted && (
        <div className="mt-6 bg-green-500 text-white p-4 rounded-lg flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="font-medium">
              Your leave request has been submitted successfully and is under
              review by the admin. You will be contacted shortly for the
              checkout process.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
