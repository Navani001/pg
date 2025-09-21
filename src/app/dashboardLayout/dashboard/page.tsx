"use client"
import BillCard from "@/component/billCard";
import { getRequest } from "@/utils";
import { Button, Input } from "@heroui/react";
import { Search } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TbCalendarDot } from "react-icons/tb";
declare global {
  interface localStorage{

  }
}
type Payment = {
  month: string;
  type: string;
  amount: string;
  paymentDate: string;
  status: "Pending" | "Paid";
};

const payments: Payment[] = [
  {
    month: "Aug 2025",
    type: "Payment",
    amount: "$ 2,430",
    paymentDate: "---",
    status: "Pending",
  },
  {
    month: "Jul 2025",
    type: "Electricity",
    amount: "$ 1,020",
    paymentDate: "12 Aug 2025",
    status: "Paid",
  },
  {
    month: "Jun 2025",
    type: "Payment",
    amount: "$ 2,650",
    paymentDate: "10 Jul 2025",
    status: "Paid",
  },
];

const bills = [
  {
    title: "Current Month Rent",
    amount: "$7,500",
    dueDate: "10 Sep 2025",
    status: "Pending" as const,
    details: ["Includes maintenance & parking"],
  },
  {
    title: "Electricity Bill - Aug 2025",
    amount: "$500",
    dueDate: "9 Sep 2025",
    status: "Paid" as const,
    details: ["Total Units Consumed --- 145 Units", "Total Amount --- 1,500"],
  },
];

declare global{
  interface LocalStorage {

  }
}

export default function OverView() {
  const router = useRouter();
  const [overView,setOverView]=useState<any>(null)
  const [paymentsData,setPaymentsData]=useState<any>([])
  useEffect(() => {
    const storedToken = localStorage?.getItem("token");
    getRequest("api/v1/user/current-month-overview",{authorization: `Bearer ${storedToken}`}).then((res:any) => {
      console.log("Overview Response:", res);
      if (res && res.success !== false){
        setOverView(res.data)
      }else{
        redirect('/login')
      }
    });
    getRequest("api/v1/user/payments/history", { authorization: `Bearer ${storedToken}` }).then((res: any) => {
      console.log("Overview Response:", res);
      if (res && res.success !== false) {
        setPaymentsData(res.data.payments)
      } else {
        redirect('/login')
      }
    });
  },[])
  var months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // console.log("Stored Token:", storedToken);
  return (
    <div className="h-full p-4 md:p-6 w-full overflow-y-scroll scrollbar-hide">
      {/* Header */}
      <h1 className="text-2xl mb-5 font-bold text-gray-900">
        Current Month Details
      </h1>
      <div className="flex items-center  justify-between gap-3 mb-8 ml-0.5">
        <Input
          variant="bordered"
          placeholder="Search bills, receipts"
          className="xl:w-1/4 lg:w-1/3 md:w-1/2 w-full  text-base font-semibold"
          startContent={
            <Search className="text-default-400 pointer-events-none shrink-0" />
          }
        />
        <Button onPress={() => {
          router.push('/dashboardLayout/proof')
        }} className="bg-red-500 hover:bg-red-600 flex items-center gap-1 text-white py-2 rounded-lg font-medium transition-colors">
          <TbCalendarDot />
          Pay Now
        </Button>
      </div>

      {/* Current Month Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* {bills.map((bill, idx) => (
          <BillCard
            key={idx}
            title={bill.title}
            amount={bill.amount}
            dueDate={bill.dueDate}
            status={bill.status}
            details={bill.details}
          />
        ))} */}
        <BillCard
          key={0}
          title={bills[0].title}
          amount={overView?.billing?.rentAmount}
          dueDate={`$${overView?.currentMonth?.month} ${overView?.currentMonth?.monthName.slice(0,3)} ${overView?.currentMonth?.year}`}
          status={overView?.paymentInfo?.paymentStatus}
        />
        <BillCard
          key={1}
          title={bills[1].title}
          amount={overView?.billing?.electricityBillAmount}
          // dueDate={bills[1].dueDate}
          dueDate={`$${overView?.currentMonth?.month} ${overView?.currentMonth?.monthName.slice(0, 3)} ${overView?.currentMonth?.year}`}
          status={overView?.paymentInfo?.paymentStatus}
        />
      </div>

      {/* Payment History */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Room rent & Electricity payment History
        </h2>

        {/* Header row - hide on small screens */}
        <div className="hidden md:grid grid-cols-5 bg-gray-100 border border-gray-300 text-blue-700 text-sm font-bold p-3 rounded-lg">
          <div>Month</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Payment date</div>
          <div>Status</div>
        </div>

        {/* Data rows */}
        <div className="font-bold divide-y divide-gray-200">
          {/* {payments.map((payment, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 items-start md:items-center px-3 py-4 text-sm text-gray-700"
            >
       
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Month:</span>
                {payment.month}
              </div>

              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Type:</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
                  {payment.type}
                </span>
              </div>

              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Amount:</span>
                <span className="font-bold">{payment.amount}</span>
              </div>

              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">
                  Payment Date:
                </span>
                {payment.paymentDate}
              </div>

              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white font-semibold ${payment.status === "Pending"
                      ? "bg-orange-500"
                      : "bg-green-500"
                    }`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))} */}
          {paymentsData && paymentsData?.map((payment:any, idx:any) => (
            <div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0 items-start md:items-center px-3 py-4 text-sm text-gray-700"
            >
              {/* Month */}
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Month:</span>
                {months[payment.month - 1].slice(0,3)} - {payment.year}
                {/* "month": 9,
                "year": 2025, */}
              </div>

              {/* Type */}
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Type:</span>
                {payment.paymentMethod  && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
                {payment.paymentMethod}
                </span>}
                {!payment.paymentMethod && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
 Not Initialed
                </span>}
              </div>

              {/* Amount */}
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Amount:</span>
                <span className="font-bold">{payment.amount}</span>
              </div>

              {/* Payment Date */}
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">
                  Payment Date:
                </span>
                {payment.paidDate}
              </div>

              {/* Status */}
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 md:hidden">Status:</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white font-semibold ${payment.paymentStatus === "PENDING"
                    ? "bg-orange-500"
                    : "bg-green-500"
                    }`}
                >
                  {payment.paymentStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
