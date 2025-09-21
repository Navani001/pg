type BillCardProps = {
  title: string;
  amount: string;
  dueDate: string;
  status: "PENDING" | "PAID";
  details?: string[];
};

export default function BillCard({
  title,
  amount,
  dueDate,
  status,
  details,
}: BillCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg py-4 pr-10 pl-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span
          className={`${
            status === "PENDING" ? "bg-orange-500" : "bg-green-500"
          } text-white text-xs font-medium px-3 py-1 rounded-full`}
        >
          {status}
        </span>
      </div>

      {/* Amount */}
      <div className="mb-4">
        <span className="text-xl font-bold text-gray-900">{amount}</span>
      </div>

      {/* Due Date */}
      <div className="text-sm text-gray-900 mb-4 font-semibold">
        Due: {dueDate}
      </div>

      {/* divider */}
      <div className="border-gray-400 border-t-2 rounded-md h-0.5 my-5"></div>

      {/* Extra Details */}
      {details && (
        <div className="space-y-2">
          {details.map((item, idx) => (
            <div key={idx} className="text-gray-900 font-semibold">
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
