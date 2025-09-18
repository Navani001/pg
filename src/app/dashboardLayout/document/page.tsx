"use client";

import TermsAndConditions from "@/component/terms&conditions";
import {
  Button,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Check, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { IoFolderOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";

export default function Document() {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
  } | null>(null);
  const [showSuccess, setShowSuccess] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const documentTypes = ["Aadhar Card", "PAN Card", "Passport"];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      });
    }
  };

  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Your Documents
        </h1>
        <p className="text-gray-600 text-sm">
          Please upload the required documents to complete your registration
          process. All documents must be approved by the admin before final
          verification.
        </p>
      </div>

      {/* Document Type Selection */}
      <div className="shadow-lg p-4 rounded-md border border-gray-300">
        <div className="mb-6">
          <label className="flex gap-1 text-sm font-bold text-gray-700 items-center mb-3">
            Select Document Type
            <span className=" text-gray-400 flex items-center">
              <MdOutlineInfo />
            </span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Choose the type of document you're uploading for verification
          </p>

          <Select
            className="w-full"
            variant="bordered"
            placeholder="Select an document"
            classNames={{
              listboxWrapper: "border border-gray-300 rounded-lg",
            }}
          >
            {documentTypes.map((options, index) => (
              <SelectItem
                className={`border-b border-gray-200 px-3 py-2 ${
                  index === documentTypes.length - 1 ? "border-none" : ""
                }`}
              >
                {options}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* File Upload Area */}
        <div className="mb-6 font-semibold">
          <div
            className="border-2 border-dashed rounded-lg px-8 py-4 text-center transition-colors 
                 border-gray-900 hover:border-gray-400"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <IoMdCloudUpload className="w-12 h-12 text-gray-900 mx-auto mb-3" />
            <p className="text-gray-900 font-bold text-xl mb-2">
              Drag & drop your document image here or click to browse and upload
            </p>
            <p className="text-gray-900 mb-3">Upload the document image</p>
            <div className="flex items-center gap-1 md:gap-2 w-full justify-center ">
              <Button
                onPress={() => fileInputRef.current?.click()}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full font-mediuminline-flex items-center"
              >
                <IoFolderOutline className="w-4 h-4 font-bold" />
                <span>Browse File</span>
              </Button>
              <p className="text-xs md:text-sm text-gray-900">
                JPG, PNG, PDF up to 10MB each
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {uploadedFile && (
          <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-green-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900 truncate max-w-xs">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  Uploaded • {uploadedFile.size} MB
                </p>
              </div>
            </div>
            <Button
              variant="bordered"
              className="px-3 py-1 rounded-md text-sm font-medium "
            >
              Ready
            </Button>
          </div>
        )}

        <Button className="bg-red-500 hover:bg-red-600 mt-4 text-white px-6 py-2 rounded-md font-medium">
          Submit for Approval
        </Button>
      </div>

      {/* Terms & Conditions */}
      <Button
        variant="bordered"
        onPress={onOpen}
        className="px-4 mt-4 py-1 rounded-md text-sm font-medium"
      >
        Terms & Conditions
      </Button>
      <div className="border p-6 w-full rounded-md mt-4">
        <p className="text-gray-900 font-semibold mb-6">
          By submitting my digital signature, I confirm that I have read and
          accepted the Hostel Rules & Regulations / Terms & Conditions.
        </p>
        <div className="flex justify-end w-full">
          <Button className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-md font-medium transition-colors">
            Submit
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-500 text-white mt-5 p-4 rounded-lg shadow-lg flex items-center">
          <Check className="w-5 h-5" />
          <div>
            <p className="font-medium">
              Your document has been submitted and is pending admin approval.
              You will be notified once it is reviewed.
            </p>
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>{<TermsAndConditions />}</ModalContent>
      </Modal>
    </div>
  );
}
