import { Sidebar } from "@/component";
import BillCard from "@/component/billCard";
import { Button } from "@heroui/react";
import { Search } from "lucide-react";
import { TbCalendarDot } from "react-icons/tb";

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

export default function page() {
  return (
    <div className="h-full flex w-screen overflow-hidden">
      <div className="h-full w-1/6">
        <Sidebar />
      </div>
      <div className="h-full w-5/6 overflow-y-scroll p-6 scrollbar-hide">
        {/* Header */}
        <h1 className="text-2xl mb-5 font-bold text-gray-900">
          Current Month Details
        </h1>
        <div className="flex items-center justify-between mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search bills, receipts"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            />
          </div>
          <Button className="bg-red-500 hover:bg-red-600 flex items-center gap-1 text-white py-2 rounded-lg font-medium transition-colors">
            <TbCalendarDot />
            Pay Now
          </Button>
        </div>

        {/* Current Month Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {bills.map((bill, idx) => (
            <BillCard
              key={idx}
              title={bill.title}
              amount={bill.amount}
              dueDate={bill.dueDate}
              status={bill.status}
              details={bill.details}
            />
          ))}
        </div>

        {/* Payment History */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Room rent & Electricity payment History
          </h2>

          {/* Header row */}
          <div className="grid grid-cols-5 bg-gray-100 border border-gray-300 text-blue-700 text-sm font-bold p-3 rounded-lg">
            <div>Month</div>
            <div>Type</div>
            <div>Amount</div>
            <div>Payment date</div>
            <div>Status</div>
          </div>

          {/* Data rows */}
          <div className="font-bold">
            {payments.map((payment, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 items-center px-3 py-4 text-sm text-gray-700"
              >
                {/* Month */}
                <div>{payment.month}</div>

                {/* Type */}
                <div>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">
                    {payment.type}
                  </span>
                </div>

                {/* Amount */}
                <div className="font-bold">{payment.amount}</div>

                {/* Payment Date */}
                <div>{payment.paymentDate}</div>

                {/* Status */}
                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs text-white font-semibold ${
                      payment.status === "Pending"
                        ? "bg-orange-500"
                        : "bg-green-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
