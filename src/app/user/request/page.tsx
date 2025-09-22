"use client";
import { SnackBar } from "@/component";
import { formatCalendarDateToISO, postRequest } from "@/utils";
import { Button, DatePicker, Input, Textarea } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Check } from "lucide-react";
import { useState } from "react";
export default function Request() {
  const [formData, setFormData] = useState({
    leaveDate: null as CalendarDate | null,
    reason: "",
    feedback: "Nothing",
    confirmTerms: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarData, setSnackbarData] = useState<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    message: "",
    severity: "success",
  });
  const handleSnackbarClose = () => setSnackbarOpen(false);


  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    const formattedDate = formatCalendarDateToISO(formData.leaveDate);
    
    if (!formData.leaveDate || !formData.confirmTerms) {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Please select a leave date and confirm terms & conditions.",
        severity: "error"
      });
      return;
    }
    const token = localStorage.getItem("token");


    postRequest(`api/v1/user/leaving-requests/apply`, {
      feedback: formData.feedback,
      reason: formData.reason,
      requestedLeaveDate: formattedDate, // This will be in YYYY-MM-DD format
    }, { authorization: `Bearer ${token}` }).then((res) => {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Your leave request has been submitted successfully and is under review by the admin. You will be contacted shortly for the checkout process.",
        severity: "success"
      });
    }).catch((err) => {
      console.error("Error submitting leave request:", err);
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Error submitting leave request. Please try again.",
        severity: "error"
      });
    });
  };

  // const reasonOptions = [
  //   "Job transfer",
  //   "Personal reasons",
  //   "Family emergency",
  //   "Health issues",
  //   "Education",
  //   "Other",
  // ];

  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
      <SnackBar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackBarData.message}
        severity={snackBarData.severity}
        autoHideDuration={4000}
      />
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
              value={formData.leaveDate}
              onChange={(date) => {
                setFormData((prev) => ({ ...prev, leaveDate: date }));
              }}
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900",
              }}
            />

            {/* Reason for leaving */}
            {/* <Select
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
            </Select> */}
            <Input
              label="Reason for leaving"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              labelPlacement="outside"
              classNames={{
                label: "text-base text-gray-900",
                base: "!pt-1"
              }}

              defaultValue="MRM PG"
              variant="bordered"
              className="w-full"
            />
          </div>

          {/* Feedback */}
          <Textarea
            variant="bordered"
            label="Feedback (Optional)"
            labelPlacement="outside"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
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
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${formData.confirmTerms
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

    
    </div>
  );
}
