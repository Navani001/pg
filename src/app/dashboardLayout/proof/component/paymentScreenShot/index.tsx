
"use client"
import { Button } from "@heroui/react";
import { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { IoFolderOutline } from "react-icons/io5";
interface PayMentScreenShootProps {
    uploadedFile: UploadedFile | null;
    setUploadedFile: (file: UploadedFile | null) => void;

}
interface UploadedFile {
    name: string;
    size: string;
    file: File;
}
export function PayMentScreenShoot(props: PayMentScreenShootProps) {
    const { uploadedFile, setUploadedFile } = props

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile({
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2),
                file: file
            });
        }
    };
    return (
        <div className=" w-full flex justify-between  p-3 border rounded-lg">
            <div className=" flex items-center">
                <Button
                    onPress={() => fileInputRef.current?.click()}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 w-auto h-auto rounded-full font-medium transition-colors inline-flex items-center "
                >
                    <IoFolderOutline className="w-4 h-4 font-bold" />
                    <span>Browse File</span>
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                />
            </div>
            <div className="h-full flex flex-col">
                <p className="font-poppins font-semibold text-lg">{uploadedFile ? uploadedFile.name : "No file Selected"}
                </p>
                <p>Allowed formats: JPG, PNG, PDF
                </p>
                <p>(Max size:  5MB)
                </p>
            </div>
            <div className=" flex items-center"><Button
                onPress={() => fileInputRef.current?.click()}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 w-auto h-auto rounded-lg font-medium transition-colors inline-flex items-center "
            >
                <FiDownload className="w-5 h-5 font-bold" />

                <span>Upload Screenshot</span>
            </Button></div>

        </div>
    );
}
