import { ButtonComponent, Sidebar } from "@/component";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";
import { NoteProof } from "./component/note";
import { PayMentScreenShoot } from "./component/paymentScreenShot";
import { InputField } from "@/component/input";
import { MdPayment } from "react-icons/md";
import { PaymentDropDown } from "./component/payment";
import { IoMdEye } from "react-icons/io";
import { Chip } from "@/component/chip";


export default function page() {
    const status: string = "upload"
    return (
        <div className="h-full w-full flex gap-2 flex-col  ">

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Upload Proof
            </h1>
            <Month />
            <DetailProof header="Proof Details" month="August 2025" status="pending" amount="$ 2,430" />
            {status === "pending" &&
                <div className="flex flex-col">
                    <span className="font-semibold">Amount</span>
                    <p>Enter your rent / fee amount below and click submit</p>
                    <div className="flex gap-2 items-center">
                        <div className="w-[40%]  mt-2 flex items-center gap-3 ">
                            <InputField />
                        </div>
                        <div className="w-[40%]  mt-2 flex items-center gap-3 ">
                            <ButtonComponent buttonText="Submit" baseClassName="w-auto h-auto p-3 bg-primary-800 text-white" isIcon={false} />
                        </div>
                    </div>
                    <div className="mt-2">

                        <ButtonComponent isEndIcon={false} isStartIcon={true} buttonText="Payment Type" baseClassName="w-auto h-auto p-3 bg-primary-50 text-white rounded-xl" buttonIcon={<MdPayment />} />
                    </div>

                </div>
            }
            {
                status === "pending" &&

                <div className="border px-5 py-3 rounded-lg">
                    <PaymentDropDown />
                    <h3 className="mt-3 font-semibold text-lg ">Upload Payment Screenshot</h3>
                    <p className="mb-3 font-poppins">Upload your rent payment receipt/screenshot as proof of payment</p>
                    <PayMentScreenShoot />
                    <h3 className="my-3 font-semibold text-lg ">Upload Electricity Payment Screenshot</h3>
                    <PayMentScreenShoot />
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
                <div className="grid md:grid-cols-5 justify-between w-full gap-3">
                    <div className="border md:col-span-3 rounded-lg p-2 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Current Status</span>
                            <ButtonComponent buttonText="View Status" isEndIcon={false} isStartIcon buttonIcon={<IoMdEye className="" />} baseClassName="w-auto h-auto p-2   " />
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
        </div>
    );
}
