import { ButtonComponent } from "@/component";
import { Chip } from "@/component/chip";
import { IoMdCloseCircleOutline } from "react-icons/io";

interface ModelContentProps {

}
export function ModelContent(props: ModelContentProps) {


    return (
        <div className="grid grid-cols-5 gap-3 justify-between">
            <div className="border flex flex-col p-3 gap-4 pt-6 col-span-3 rounded-md pb-7">
                <div className="flex justify-between w-full ">
                    <div className="w-[50%] font-normal text-sm"> Current Status</div>
                    <div className="w-[50%]"><Chip label="Under Review" textClassName="!text-[10px]" className="bg-primary-500 !text-xs" />
                </div>

                </div>
                <div className="flex justify-between w-full ">
                    <div className="w-[50%] font-normal text-sm"> Submitted On</div>
                    <div className="w-[50%] text-sm">
                        Aug 14, 2025 - 10:42 AM
                    </div>

                </div>
                <div className="flex justify-between w-full ">
                    <div className="w-[50%] font-normal text-sm">Billing Month</div>
                    <div className="w-[50%] text-sm">
August 2025                    </div>

                </div>
            </div>
            <div className="col-span-2 h-full">
                <span className="w-full h-full  flex flex-col gap-1">
                    <span className="font-medium text-sm">Admin Notes</span>
                    <div className="w-full h-full border rounded-md p-2 ">
                        No notes yet
                    </div>
                </span>
            </div>

        </div>
    );
}
