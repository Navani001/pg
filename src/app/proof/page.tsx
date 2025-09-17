import { Sidebar } from "@/component";
import { Month } from "./component/Month";
import { DetailProof } from "./component/details";
import { NoteProof } from "./component/note";
import { PayMentScreenShoot } from "./component/paymentScreenShot";


export default function page() {
    return (
        <div className="h-full w-full flex gap-2 flex-col overflow-hidden">

            <Month />
            <DetailProof header="Proof Details" month="August 2025" status="pending" amount="$ 2,430" />
            <PayMentScreenShoot/>
            <NoteProof content="Make sure your screenshot is clear
                and complete before uploading. Once
                approved, your payment will be
                marked aa Paid for the selected month." />

        </div>
    );
}
