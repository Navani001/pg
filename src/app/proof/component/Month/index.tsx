import { ButtonComponent, MonthCard, Sidebar } from "@/component";
import { SlCalender } from "react-icons/sl";
import { DetailProof } from "../details";

export function Month() {
    const year = "2025"
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return (
        <div className=" p-3 flex flex-col w-full overflow-hidden gap-3 ">
            <div className="">
                <ButtonComponent iconClassName="ml-1" baseClassName="w-auto h-auto p-3 !rounded-lg " buttonIcon={<SlCalender />} buttonText={`${year}`} />
            </div>
            <div className="w-full grid grid-cols-6 gap-2">
                {
                    months.map((month) => (
                        <MonthCard key={month} month={month}  selected={false} />
                    ))
                }
            </div>
        </div>
    );
}
