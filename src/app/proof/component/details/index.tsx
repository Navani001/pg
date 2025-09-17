import { Chip } from "@/component/chip";

interface DetailProofProps {
header: string;
month: string;
status: string;
amount: string;

}
interface LabelType {
    text: string,
    className: string,
}
export function DetailProof(props:DetailProofProps) {
    const{header, month, status, amount}=props
    const label: LabelType = (() => {
        switch (status) {
            case "pending":
                return { className: "bg-primary text-white", text: "pending" };
            case "upload":
                return { className: "bg-success text-white", text: "upload" };
            default:
                return { className: "", text: "" };
        }
    })();
    return (
        <div className="h-full w-full  p-3">
            <div className="font-semibold">{header}</div>
            <div className="flex shadow-lg  justify-between p-3 rounded-lg">
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-md"> {month}</span>
                    <span className=" text-sm">Status        {label.text!='' && <Chip label={label.text} className={label.className} />}
                    </span> 
                    <span className=" text-sm">Pay this month’s rent to avoid late charges.</span> 

                </div>
                <div className="flex justify-center items-center font-semibold">
                    {amount}
                </div>

            </div>
        </div>
    );
}
