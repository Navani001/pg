import { Sidebar } from "@/component";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";


export default function page() {
    return (
        <div className="h-full flex w-screen overflow-hidden">
            <div className="h-full w-1/6">
                <Sidebar />
            </div>
            <div className="h-full w-5/6 overflow-y-scroll scrollbar-hide ">
                <Month />
                <DetailProof header="Proof Details" month="August 2025" status="pending" amount="$ 2,430" />
            </div>
        </div>
    );
}
