"use client"
import { ButtonComponent, SnackBar } from "@/component";
import { Chip } from "@/component/chip";
import { InputField } from "@/component/input";
import { getRequest, postRequest } from "@/utils";
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";
import { ModelContent } from "./component/modelContent";
import { NoteProof } from "./component/note";
import { PayMentScreenShoot } from "./component/paymentScreenShot";

interface UploadedFile {
    name: string;
    size: string;
    file: File;
}

export default function page() {
    const Payment: { key: string; label: string }[] = [
        { key: "Online", label: "Online" },
        { key: "Cash", label: "Cash" },
        { key: "Cheque", label: "Cheque" },
        { key: "UPI", label: "UPI" },
        { key: "Card", label: "Card" },
    ];
    const [paymentMethod, setPaymentMethod] = useState<string>("ONLINE")
    const [openModel, setOpenModel] = useState(false);
    const [status, setStatus] = useState<string>("upload");
    const [monthData, setMonthData] = useState<any>([])
    const reason: string[] = ["Blurry or unclear image", "Incomplete screenshot"];
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
    const [uploadedElectFile, setUploadedElectFile] = useState<UploadedFile | null>(null);
    const [amount, setAmount] = useState<string>()
    const [year, setYear] = useState<string>(new Date().getFullYear().toString())
    const [selectedMonth, setSelectedMonth] = useState<any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarData, setSnackbarData] = useState<
    {
        message: string,
        severity:'success' | 'error' | 'info' | 'warning'
    }>({
        message:"test",
        severity:"success"
    });
    // Add safety check for monthData and selectedIndex
    useEffect(() => {
        if (monthData?.months && monthData.months.length > 0 && selectedIndex < monthData.months.length) {
            setStatus(monthData.months[selectedIndex].status);
            setSelectedMonth(monthData.months[selectedIndex].monthNumber);
        }
    }, [selectedIndex, monthData])
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoading(true);
        getRequest(`api/v1/user/payments/year/${year}`, {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",

        }).then((res: any) => {
            if (res && res.success !== false) {
                setMonthData(res.data)
                // Reset selectedIndex if it's out of bounds
                if (res.data?.months && selectedIndex >= res.data.months.length) {
                    setSelectedIndex(0);
                }
            } else {
                redirect('/login')
            }
        }).catch((error: any) => {
            console.error("Error fetching payment data:", error);
        }).finally(() => {
            setIsLoading(false);
        });

    }, [year])
    const handleSubmit = () => {
       
        const token = localStorage.getItem("token");
        setIsSubmitting(true);
        if (paymentMethod === "ONLINE") {
            if (!uploadedFile || !uploadedElectFile || !amount || !selectedMonth || !year) {
                setSnackbarData({
                    message: "Please fill all the required fields.",
                    severity: "error"
                })
                setSnackbarOpen(true);
                setIsSubmitting(false);
                return
            }

            const formData = new FormData();
            formData.append("amount", amount);
            formData.append("month", selectedMonth);
            formData.append("year", year);
            formData.append("paymentMethod", paymentMethod);


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
                    if (res.success) {
                        setSnackbarOpen(true);
                        setSnackbarData({
                            message: "form is successfully submitted",
                            severity: "success"
                        })
                        // Refresh page or update state
                    }
                })
                .catch((error: any) => {
                    console.error("Upload Error:", error);
                    if (error.response?.data) {
                        
                        console.error("Error details:", error.response.data);
                    }
                })
                .finally(() => {
                    setIsSubmitting(false);
                });

        }
        else if (paymentMethod === "CASH") {
            const formData = new FormData();
            if ( !amount || !selectedMonth || !year) {
                setSnackbarData({
                    message: "Please fill all the required fields.",
                    severity: "error"
                })
                setSnackbarOpen(true);
                setIsSubmitting(false);
                return
            }
            formData.append("amount", amount);
            formData.append("month", selectedMonth);
            formData.append("year", year);
            formData.append("paymentMethod", paymentMethod);
            // Make sure your postRequest function handles FormData correctly
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            postRequest(`api/v1/user/payments/upload/cash`, {
                amount,
                month: selectedMonth,
                year,
                paymentMethod
            }, headers)
                .then((res: any) => {
                    if (res.success) {
                      
                        setSnackbarOpen(true);
                        setSnackbarData({
                            message: "form is successfully submitted",
                            severity: "success"
                        })
                        // Refresh page or update state
                    }
                })
                .catch((error: any) => {
                    console.error("Upload Error:", error);
                    if (error.response?.data) {
                        console.error("Error details:", error.response.data);
                    }
                })
                .finally(() => {
                    setIsSubmitting(false);
                });

        }

    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }
    return (
        <div className="h-full w-full flex gap-3 flex-col p-4 md:p-6 ">
            <SnackBar
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackBarData.message}
                severity={snackBarData.severity}
                autoHideDuration={4000}
            />
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
            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="flex flex-col items-center gap-3">
                        <Spinner size="lg" color="primary" />
                        <p className="text-gray-600">Loading payment data...</p>
                    </div>
                </div>
            ) : (
                <>
                    <Month monthData={monthData} setMonthData={setMonthData} year={year} setYear={setYear} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
                    <div className="mb-4"></div>

                    <DetailProof header="Proof Details" month={monthData && monthData?.months && monthData?.months.length > 0 && monthData?.months[selectedIndex] ? `${monthData?.months[selectedIndex]?.month} ${year}` : ""} status={status} amount="$ 2,430" />
                    {status === "Pending" &&
                        <div className="flex flex-col">
                            <span className="font-semibold">Amount</span>
                            <p>Enter your rent / fee amount below and click submit</p>
                            <   div className="flex gap-2 items-center">
                                <div className="w-[40%]  mt-2 flex items-center gap-3 ">
                                    <InputField type="number" value={amount} inputOnChange={(e) => setAmount(e.target.value)} disabled={isSubmitting || isLoading} />
                                </div>
                                <div className="w-[40%]  mt-2 flex items-center gap-3 ">

                                    <Button
                                        onPress={handleSubmit}
                                        isDisabled={isSubmitting || isLoading}
                                        className="bg-primary-800 hover:bg-primary-800 text-white p-3  w-auto h-auto rounded-2xl font-medium transition-colors items-center "
                                    >
                                        {isSubmitting && <Spinner size="sm" color="white" className="mr-2" />}
                                        <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-2">

                                {/* <ButtonComponent isEndIcon={false} disabled bgColor="bg-primary-50" isStartIcon={true} buttonText="Payment Type" baseClassName="" buttonIcon={<MdPayment />} /> */}
                                <Button
                                    onPress={handleSubmit}
                                    className="w-auto h-auto p-3 bg-primary-50 text-white rounded-xl"
                                >
                                    {/* <IoFolderOutline className="w-4 h-4 font-bold" /> */}
                                    <span>Payment Type</span>
                                </Button>
                            </div>

                        </div>
                    }
                    {status === "Pending" && (
                        <div className="border px-5 py-3 rounded-lg">
                            <div className="border py-1 border-gray-300 w-full shadow-sm overflow-hidden rounded-lg px-4 flex justify-between items-center">
                                <Checkbox radius="full" color="success" isSelected={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} isDisabled={isSubmitting || isLoading}></Checkbox>
                                <Select
                                    variant="flat"
                                    classNames={{
                                        base: "w-full bg-transparent border-none shadow-none",
                                        trigger:
                                            "bg-transparent border-none shadow-none focus:ring-0 focus:outline-none hover:!bg-transparent data-[hover=true]:!bg-transparent",
                                        value: "text-gray-700",
                                        listboxWrapper: "border border-gray-300 rounded-lg",
                                    }}
                                    placeholder="Online Payment"
                                >
                                    {Payment.map((payment) => (
                                        <SelectItem
                                            key={payment.key}
                                            className="w-full border-b border-gray-200 last:border-none"
                                        >
                                            {payment.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                            <h3 className="mt-3 font-semibold text-lg ">
                                Upload Payment Screenshot
                            </h3>
                            <p className="mb-3 font-poppins">
                                Upload your rent payment receipt/screenshot as proof of payment
                            </p>
                            <PayMentScreenShoot uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                            <h3 className="my-3 font-semibold text-lg ">
                                Upload Electricity Payment Screenshot
                            </h3>
                            <PayMentScreenShoot uploadedFile={uploadedElectFile} setUploadedFile={setUploadedElectFile} />
                            <div className="border py-1 my-4 border-gray-300 w-full shadow-sm overflow-hidden rounded-lg px-4 flex justify-between items-center">

                                <Checkbox radius="full" color="success" isSelected={paymentMethod === "CASH"} onChange={() => setPaymentMethod("CASH")} isDisabled={isSubmitting || isLoading}></Checkbox>

                                <Select

                                    variant="flat"

                                    classNames={{

                                        base: "w-full bg-transparent border-none shadow-none",

                                        trigger:

                                            "bg-transparent border-none shadow-none focus:ring-0 focus:outline-none hover:!bg-transparent data-[hover=true]:!bg-transparent",

                                        value: "text-gray-700",

                                        listboxWrapper: "border border-gray-300 rounded-lg",

                                    }}

                                    placeholder="Cash Payment"

                                >

                                    <SelectItem className="w-full border-b border-gray-200 last:border-none">

                                        Cash

                                    </SelectItem>

                                </Select>

                            </div>

                        </div>

                    )}


                    {/* {
                status === "Pending" &&

                <div className="border px-5 py-3 rounded-lg">
                    <PaymentDropDown />
                    <h3 className="mt-3 font-semibold text-lg ">Upload Payment Screenshot</h3>
                    <p className="mb-3 font-poppins">Upload your rent payment receipt/screenshot as proof of payment</p>
                    <PayMentScreenShoot uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                    <h3 className="my-3 font-semibold text-lg ">Upload Electricity Payment Screenshot</h3>
                    <PayMentScreenShoot uploadedFile={uploadedElectFile} setUploadedFile={setUploadedElectFile} />
                </div>
            } */}
                    {
                        status === "Pending" &&

                        <div className="my-2 max-w-sm">
                            <NoteProof content="Make sure your screenshot is clear
                        and complete before uploading. Once
                        approved, your payment will be
                        marked as Paid for the selected month." />

                        </div>
                    }
                    {status === "rejection" && (
                        <div className="space-y-2">
                            <div className="flex items-center my-1 gap-3 shadow-md bg-orange-500 border-0 border-orange-600 text-gray-900 px-4 py-3 rounded-lg">
                                <HiOutlineExclamationTriangle className="text-xl font-bold" />
                                <div>
                                    <h2 className="text-lg font-bold">
                                        Your payment screenshoot has been rejected by the admin.
                                    </h2>
                                    <p>
                                        please review the reason below and follow the recommended steps
                                        to resolve.
                                    </p>
                                </div>
                            </div>
                            <div className="border px-5 py-3 mb-4 rounded-lg mt-3">
                                <h3 className="font-semibold text-lg mb-2">Rejection Reason</h3>
                                <div className="space-y-2">
                                    {reason.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 text-gray-900"
                                        >
                                            <RxCrossCircled className="text-xl" />
                                            <div className="text-gray-900 font-semibold">{item}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h2 className="text-xl font-bold">Upload Payment Screenshot</h2>
                            <p>Upload your rent payment receipt/screenshot as proof of payment</p>
                            <PayMentScreenShoot uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
                            <h2 className="text-xl font-bold">
                                Upload Electricity Payment Screenshot
                            </h2>
                            <PayMentScreenShoot uploadedFile={uploadedElectFile} setUploadedFile={setUploadedElectFile} />
                            <div className="mt-5" />
                        </div>
                    )}
                    {
                        status === "upload" &&
                        <div className="grid md:grid-cols-5 justify-between w-full gap-3 mt-3">
                            <div className="border md:col-span-3 rounded-lg p-2 flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Current Status</span>
                                    {/* <ButtonComponent handleOnClick={() => {
                                setOpenModel(!openModel);
                            }} buttonText="View Status" isEndIcon={false} isStartIcon buttonIcon={<IoMdEye className="" />} baseClassName="w-auto h-auto p-2   " /> */}
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
                </>
            )}
            
            {/* <Modals size={"lg"} width="1029px" hideCloseButton ModalContents={<ModelContent/>} isopen={openModel} onClose={() => setOpenModel(false)} /> */}

        </div>
    );
}
