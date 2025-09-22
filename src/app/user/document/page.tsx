"use client";

import { SignaturePad, SnackBar } from "@/component";
import TermsAndConditions from "@/component/terms&conditions";
import { getRequest, putRequest } from "@/utils";
import {
  Button,
  Modal,
  ModalContent,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Check, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { IoFolderOutline } from "react-icons/io5";
import { MdOutlineInfo } from "react-icons/md";
import SignatureCanvas from "react-signature-canvas";

import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export default function Document() {
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    file?: File;
    imageUrl?: string;
  } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isApproved, setIsApproved] = useState(false)
  const documentTypes = ["Aadhar Card",];
  const [snackBarData, setSnackbarData] = useState<
    {
      message: string,
      severity: 'success' | 'error' | 'info' | 'warning'
    }>({
      message: "test",
      severity: "success"
    })
  const loadImageFromUrl = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Create a File object
      const file = new File([blob], "downloaded-image.jpg", { type: blob.type });
     
      // Create a DataTransfer to simulate user file selection
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;

        // ✅ trigger change event manually (important for React forms)
        const event = new Event("change", { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    getRequest("api/v1/user/document-proof", {
      authorization: `Bearer ${token}`
    }).then((res: any) => {
      if (res && res.success !== false) {
        const imageUrl = "http://localhost:5000" + res.data.documentUrl;
        // setUploadedFile({
        //   name: res.data.fileName,
        //   size: (res.data.fileSize / 1024 / 1024).toFixed(2),
        //   imageUrl: imageUrl
        // });
      }
    })
    getRequest("api/v1/user/digital-signature", {
      authorization: `Bearer ${token}`
    }).then((res: any) => {
      if (res && res.success !== false) {

        // setUploadedFile({name:res.data.fileName,size:(res.data.fileSize/1024/1024).toFixed(2)})
      }
    })
  }, [])
  const handleFileSubmit = () => {
    setSnackbarOpen(true);

    if (!isApproved) {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Please agree to the Terms & Conditions first.",
        severity: "error"
      });
      return;
    }
    if(!uploadedFile?.file){
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Please upload a document.",
        severity: "error"
      });
      return;
    }

    // Use FormData for file upload
    const formData = new FormData();
    formData.append('documentProof', uploadedFile?.file as Blob);
    const token = localStorage.getItem("token");
    
    putRequest(`api/v1/user/document-proof`, formData, {
      authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }).then((res: any) => {
      if (res && res.success !== false) {
        setSnackbarOpen(true);
        setSnackbarData({
          message: "Document uploaded successfully!",
          severity: "success"
        });
      } else {
        setSnackbarOpen(true);
        setSnackbarData({
          message: "Failed to upload document.",
          severity: "error"
        });
      }
    });
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        file: file,
        imageUrl: imageUrl,
      });
    }
  };
  const sigCanvas = useRef<SignatureCanvas>(null);
  const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Convert to File
  const dataURLtoFile = (dataURL: string, filename: string): File => {
    const blob = dataURLtoBlob(dataURL);
    return new File([blob], filename, { type: blob.type });
  };
  const handleSubmit = () => {
   

    // if (!isApproved) {
    //   alert("Please agree to the Terms & Conditions first.");
    //   return;
    // }
    const signatureDataURL = sigCanvas.current?.toDataURL();
    if (!signatureDataURL) return;

    // Convert to file for upload
    const signatureFile = dataURLtoFile(signatureDataURL, 'signature.png');


    // Use FormData for file upload
    const formData = new FormData();
    formData.append('digitalSignature', signatureFile);
    const token = localStorage.getItem("token");
    if (!isApproved) {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Please agree to the Terms & Conditions first.",
        severity: "error"
      });
      return;
    }
    if (!signatureFile) {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Please upload a document.",
        severity: "error"
      });
      return;
    }
    putRequest(`api/v1/user/digital-signature`, formData, {
      authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }).then((res: any) => {
      if (res && res.success !== false) {
        setSnackbarOpen(true);
        setSnackbarData({
          message: "Document uploaded successfully!",
          severity: "success"
        });
      } else {
        setSnackbarOpen(true);
        setSnackbarData({
          message: "Failed to upload document.",
          severity: "error"
        });
      }
    }).catch((err) => {
      setSnackbarOpen(true);
      setSnackbarData({
        message: "Failed to upload document.",
        severity: "error"
      });
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        file: file,
        imageUrl: imageUrl,
      });
    }
  };


  const handleSnackbarClose = () => setSnackbarOpen(false);


  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
       <SnackBar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackBarData.message}
        severity={snackBarData.severity}
        autoHideDuration={4000}
      />
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
            <span className="text-gray-400 flex items-center">
              <MdOutlineInfo />
            </span>
          </label>
          <p className="text-xs text-gray-500 mb-3">
            Choose the type of document you're uploading for verification
          </p>

          <Select
            className="w-full"
            variant="bordered"
            placeholder="Select a document"
            classNames={{ listboxWrapper: "border border-gray-300 rounded-lg" }}
          >
            {documentTypes.map((options, index) => (
              <SelectItem
                key={index}
                className={`border-b border-gray-200 px-3 py-2 ${index === documentTypes.length - 1 ? "border-none" : ""
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
            className="border-2 border-dashed rounded-lg px-8 py-4 text-center transition-colors border-gray-900 hover:border-gray-400 relative"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadedFile && uploadedFile.imageUrl ? (
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="relative">
                  <img
                    src={uploadedFile.imageUrl}
                    alt="Uploaded document preview"
                    className="max-w-full max-h-64 object-contain rounded-lg border border-gray-300 shadow-sm mx-auto"
                  />
                  {/* Overlay for re-upload */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <div className="text-white text-center">
                      <IoMdCloudUpload className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">Click to change document</p>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                <div className="flex items-center justify-center space-x-3 bg-white rounded-lg p-3 border border-green-200">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {uploadedFile.size} MB
                    </p>
                  </div>
                </div>

                {/* Upload New Button */}
                <Button
                  onPress={() => fileInputRef.current?.click()}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full font-medium inline-flex items-center"
                >
                  <IoFolderOutline className="w-4 h-4 font-bold" />
                  <span>Change Document</span>
                </Button>
              </div>
            ) : (
              <>
                <IoMdCloudUpload className="w-12 h-12 text-gray-900 mx-auto mb-3" />
                <p className="text-gray-900 font-bold text-xl mb-2">
                  Drag & drop your document image here or click to browse
                </p>
                <p className="text-gray-900 mb-3">Upload the document image</p>
                <div className="flex items-center gap-1 md:gap-2 w-full justify-center">
                  <Button onPress={() => fileInputRef.current?.click()} className="bg-red-500 hover:bg-red-600 text-white rounded-full font-medium inline-flex items-center">
                    <IoFolderOutline className="w-4 h-4 font-bold" />
                    <span>Browse File</span>
                  </Button>
                  <p className="text-xs md:text-sm text-gray-900">
                    JPG, PNG, PDF up to 10MB each
                  </p>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <Button
          onPress={handleFileSubmit}
          className="bg-red-500 hover:bg-red-600 mt-4 text-white px-6 py-2 rounded-md font-medium"
        >
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
      <div className="mt-4">
        <SignaturePad sigCanvas={sigCanvas} />
      </div>

      <div className="border p-6 w-full rounded-md mt-4">
        <p className="text-gray-900 font-semibold mb-6">
          By submitting my digital signature, I confirm that I have read and
          accepted the Hostel Rules & Regulations / Terms & Conditions.
        </p>
        <div className="flex justify-end w-full">
          <Button
            onPress={handleSubmit}
            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-md font-medium transition-colors"
          >
            Submit
          </Button>
        </div>
      </div>

      {/* MUI Snackbar */}
    

      {/* Terms & Conditions Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <TermsAndConditions onClose={onClose} accepted={isApproved} setAccepted={setIsApproved} />
        </ModalContent>
      </Modal>
    </div>
  );
}
