"use client"

import { ButtonComponent, MonthCard, Sidebar } from "@/component";
import { SlCalender } from "react-icons/sl";
import { DetailProof } from "../details";
import { useState } from "react";
import { YearDropDown } from "../yearDeopDown";

export function Month() {
    const year = "2025"
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const[selectedMonth, setSelectedMonth]=useState<string | null>(null)
    return (
        <div className="  flex flex-col w-full overflow-hidden gap-3 ">
            <div className="">
                {/* <ButtonComponent iconClassName="ml-1" baseClassName="w-auto h-auto p-3 !rounded-lg " buttonIcon={<SlCalender />} buttonText={`${year}`} /> */}
                <YearDropDown/>
            </div>
            <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2   gap-2">
                {
                    months.map((month) => (
                        <MonthCard key={month} month={month} selected={selectedMonth === month} onClick={() => setSelectedMonth(month)} />
                    ))
                }
            </div>
        </div>
    );
}
