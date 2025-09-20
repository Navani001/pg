"use client"
import { ButtonComponent, Modals, Sidebar } from "@/component";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";
import { NoteProof } from "./component/note";
import { PayMentScreenShoot } from "./component/paymentScreenShot";
import { InputField } from "@/component/input";
import { MdPayment } from "react-icons/md";
import { PaymentDropDown } from "./component/payment";
import { IoMdCloseCircleOutline, IoMdEye } from "react-icons/io";
import { Chip } from "@/component/chip";
import { useEffect, useState } from "react";
import { ModelContent } from "./component/modelContent";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { getRequest, postRequest } from "@/utils";
import { redirect } from "next/navigation";
interface UploadedFile {
    name: string;
    size: string;
    file: File;
}

export default function page() {
    const status: string = "pending"
    const [openModel, setOpenModel] = useState(false);
    const [monthData, setMonthData] = useState<any>([])
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [uploadedElectFile, setUploadedElectFile] = useState<UploadedFile | null>(null);
    const [amount, setAmount] = useState<string>()
    const [year, setYear] = useState<string>(new Date().getFullYear().toString())
    const currentMonth = new Date().getMonth().toString();
    const [selectedMonth, setSelectedMonth] = useState<number>(parseInt(currentMonth) + 1)
    console.log("Current Month:", currentMonth);
    useEffect(() => {
        const token = localStorage.getItem("token");
        getRequest(`api/v1/user/payments/year/${year}`, { authorization: `Bearer ${token}`,
        "Content-Type": "application/json",

        }).then((res: any) => {
            console.log("Overview Response:", res);
            if (res && res.success !== false) {
                setMonthData(res.data)
            } else {
                redirect('/login')
            }
        });

    }, [year])
    const handleSubmit = () => {
        if (!amount) {
            alert("Please enter the amount");
            return;
        }
        const token = localStorage.getItem("token");

        const formData = new FormData();

        console.log(uploadedFile)

        // Add all form fields to FormData
        formData.append("amount", amount);
        formData.append("month", selectedMonth.toString());
        formData.append("year", year);
        formData.append("paymentMethod", "ONLINE");


        // Add files to FormData if they exist
        if (uploadedFile?.file) {
            formData.append("rentBillScreenshot", uploadedFile.file);
        }

        if (uploadedElectFile?.file) {
            formData.append("electricityBillScreenshot", uploadedElectFile.file);
        }

        // Make sure your postRequest function handles FormData correctly
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        // Remove Content-Type to let browser set it automatically for FormData
        delete (headers as any)['Content-Type'];

        postRequest(`api/v1/user/payments/upload/online`, formData, headers)
            .then((res: any) => {
                console.log("Upload Response:", res);
                if (res.success) {
                    alert("Upload successful!");
                    // Refresh page or update state
                }
            })
            .catch((error: any) => {
                console.error("Upload Error:", error);
                if (error.response?.data) {
                    console.error("Error details:", error.response.data);
                }
            });
    }
    return (
        <div className="h-full w-full flex gap-3 flex-col p-4 md:p-6 ">
            <Modal isOpen={openModel} size={"2xl"} hideCloseButton onClose={() => setOpenModel(false)}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-between gap-1"> Payment Verification Status
                                <ButtonComponent isEndIcon={false} handleOnClick={() => setOpenModel(false)} isStartIcon={true} buttonText="Close" baseClassName="w-auto h-auto  rounded-md" buttonIcon={<IoMdCloseCircleOutline />} />
                            </ModalHeader>
                            <ModalBody className="pb-5">
                                <ModelContent />
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Proof
            </h1>
            <Month monthData={monthData} setMonthData={setMonthData} year={year} setYear={setYear} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
            <div className="mb-4"></div>
            <DetailProof header="Proof Details" month="August 2025" status="pending" amount="$ 2,430" />
            {status === "pending" &&
                <div className="flex flex-col">
                    <span className="font-semibold">Amount</span>
                    <p>Enter your rent / fee amount below and click submit</p>
                    <div className="flex gap-2 items-center">
                        <div className="w-[40%]  mt-2 flex items-center gap-3 ">
                            <InputField type="number" value={amount} inputOnChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <div className="w-[40%]  mt-2 flex items-center gap-3 ">
                            <ButtonComponent bgColor="bg-primary-800" handleOnClick={handleSubmit} buttonText="Submit" baseClassName="w-auto h-auto p-3 bg-primary-800 text-white" isIcon={false} />
                        </div>
                    </div>
                    <div className="mt-2">

                        <ButtonComponent isEndIcon={false} disabled bgColor="bg-primary-50"  isStartIcon={true} buttonText="Payment Type" baseClassName="w-auto h-auto p-3 bg-primary-50 text-white rounded-xl" buttonIcon={<MdPayment />} />
                    </div>

                </div>
            }
            {
                status === "pending" &&

                <div className="border px-5 py-3 rounded-lg">
                    <PaymentDropDown />
                    <h3 className="mt-3 font-semibold text-lg ">Upload Payment Screenshot</h3>
                    <p className="mb-3 font-poppins">Upload your rent payment receipt/screenshot as proof of payment</p>
                    <PayMentScreenShoot uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                    <h3 className="my-3 font-semibold text-lg ">Upload Electricity Payment Screenshot</h3>
                    <PayMentScreenShoot uploadedFile={uploadedElectFile} setUploadedFile={setUploadedElectFile} />
                </div>
            }
            {
                status === "pending" &&

                <div className="my-2 max-w-sm">
                    <NoteProof content="Make sure your screenshot is clear
                    and complete before uploading. Once
                    approved, your payment will be
                    marked as Paid for the selected month." />

                </div>
            }
            {
                status === "upload" &&
                <div className="grid md:grid-cols-5 justify-between w-full gap-3 mt-3">
                    <div className="border md:col-span-3 rounded-lg p-2 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Current Status</span>
                            <ButtonComponent handleOnClick={() => {
                                setOpenModel(!openModel);
                            }} buttonText="View Status" isEndIcon={false} isStartIcon buttonIcon={<IoMdEye className="" />} baseClassName="w-auto h-auto p-2   " />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Your Payment Status</span>
                            <Chip label="Under Review" className="bg-primary-500 !text-xs" />
                        </div>
                        <p className="w-[80%] font-light text-sm">Once you upload, the status changes to Under Review automatically. If rejected,
                            you can upload again. Once approved,
                            re-uploads are disabled.</p>
                    </div>
                    <div className="md:col-span-2">
                        <NoteProof content="Make sure your screenshot is clear
                    and complete before uploading. Once
                    approved, your payment will be
                    marked as Paid for the selected month." />

                    </div>
                </div>
            }
            {/* <Modals size={"lg"} width="1029px" hideCloseButton ModalContents={<ModelContent/>} isopen={openModel} onClose={() => setOpenModel(false)} /> */}

        </div>
    );
}
