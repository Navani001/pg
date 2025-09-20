"use client";
import { ButtonComponent } from "@/component";
import { Chip } from "@/component/chip";
import { InputField } from "@/component/input";
import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { IoMdCloseCircleOutline, IoMdEye } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";
import { ModelContent } from "./component/modelContent";
import { NoteProof } from "./component/note";
import { PayMentScreenShoot } from "./component/paymentScreenShot";

export default function page() {
  const status: string = "pending";
  const reason: string[] = ["Blurry or unclear image", "Incomplete screenshot"];
  const Payment: { key: string; label: string }[] = [
    { key: "Online", label: "Online" },
    { key: "Cash", label: "Cash" },
    { key: "Cheque", label: "Cheque" },
    { key: "UPI", label: "UPI" },
    { key: "Card", label: "Card" },
  ];
  const [openModel, setOpenModel] = useState(false);
  return (
    <div className="h-full w-full flex gap-3 flex-col p-4 md:p-6 ">
      <Modal
        isOpen={openModel}
        size={"2xl"}
        hideCloseButton
        onClose={() => setOpenModel(false)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between gap-1 bg-[#111]">
                {" "}
                Payment Verification Status
                <ButtonComponent
                  isEndIcon={false}
                  handleOnClick={() => setOpenModel(false)}
                  isStartIcon={true}
                  buttonText="Close"
                  baseClassName="w-auto h-auto  rounded-md"
                  buttonIcon={<IoMdCloseCircleOutline />}
                />
              </ModalHeader>
              <ModalBody className="pb-5">
                <ModelContent />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Proof</h1>
      <Month />
      <div className="mb-4"></div>
      <DetailProof
        header="Proof Details"
        month="August 2025"
        status="pending"
        amount="$ 2,430"
      />
      {status === "pending" && (
        <div className="flex flex-col">
          <span className="font-semibold">Amount</span>
          <p>Enter your rent / fee amount below and click submit</p>
          <div className="flex gap-2 items-center">
            <div className="w-[40%]  mt-2 flex items-center gap-3 ">
              <InputField />
            </div>
            <div className="w-[40%]  mt-2 flex items-center gap-3 ">
              <ButtonComponent
                buttonText="Submit"
                baseClassName="w-auto h-auto p-3 bg-primary-800 text-white"
                isIcon={false}
              />
            </div>
          </div>
          <div className="mt-2">
            <ButtonComponent
              isEndIcon={false}
              isStartIcon={true}
              buttonText="Payment Type"
              baseClassName="w-auto h-auto p-3 bg-primary-50 text-white rounded-xl"
              buttonIcon={<MdPayment />}
            />
          </div>
        </div>
      )}
      {status === "pending" && (
        <div className="border px-5 py-3 rounded-lg">
          <div className="border py-1 border-gray-300 w-full shadow-sm overflow-hidden rounded-lg px-4 flex justify-between items-center">
            <Checkbox radius="full" color="success"></Checkbox>
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
          <PayMentScreenShoot />
          <h3 className="my-3 font-semibold text-lg ">
            Upload Electricity Payment Screenshot
          </h3>
          <PayMentScreenShoot />
          <div className="border py-1 my-4 border-gray-300 w-full shadow-sm overflow-hidden rounded-lg px-4 flex justify-between items-center">
            <Checkbox radius="full" color="success"></Checkbox>
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
      {status === "rejection" && (
        <div className="space-y-2">
          <div className="flex items-center my-1 gap-3 shadow-md bg-orange-600 border border-orange-800 text-gray-900 px-4 py-3 rounded-lg">
            <HiOutlineExclamationTriangle className="text-3xl font-bold" />
            <div>
              <h2 className="text-xl font-bold">
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
          <PayMentScreenShoot />
          <h2 className="text-xl font-bold">
            Upload Electricity Payment Screenshot
          </h2>
          <PayMentScreenShoot />
          <div className="mt-5" />
        </div>
      )}
      {status === "pending" && (
        <div className="my-2 max-w-sm">
          <NoteProof
            content="Make sure your screenshot is clear
                    and complete before uploading. Once
                    approved, your payment will be
                    marked as Paid for the selected month."
          />
        </div>
      )}
      {status === "upload" && (
        <div className="grid md:grid-cols-5 justify-between w-full gap-3 mt-3">
          <div className="border md:col-span-3 rounded-lg p-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Current Status</span>
              <ButtonComponent
                handleOnClick={() => {
                  setOpenModel(!openModel);
                }}
                buttonText="View Status"
                isEndIcon={false}
                isStartIcon
                buttonIcon={<IoMdEye className="" />}
                baseClassName="w-auto h-auto p-2   "
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Your Payment Status</span>
              <Chip label="Under Review" className="bg-primary-500 !text-xs" />
            </div>
            <p className="w-[80%] font-light text-sm">
              Once you upload, the status changes to Under Review automatically.
              If rejected, you can upload again. Once approved, re-uploads are
              disabled.
            </p>
          </div>
          <div className="md:col-span-2">
            <NoteProof
              content="Make sure your screenshot is clear
                    and complete before uploading. Once
                    approved, your payment will be
                    marked as Paid for the selected month."
            />
          </div>
        </div>
      )}
      {/* <Modals size={"lg"} width="1029px" hideCloseButton ModalContents={<ModelContent/>} isopen={openModel} onClose={() => setOpenModel(false)} /> */}
    </div>
  );
}
