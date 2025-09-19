"use client"

import { ButtonComponent, MonthCard, Sidebar } from "@/component";
import { SlCalender } from "react-icons/sl";
import { DetailProof } from "../details";
import { useEffect, useState } from "react";
import { YearDropDown } from "../yearDrop";
import { getRequest } from "@/utils";
import { redirect } from "next/navigation";

export function Month() {
   const [year,setYear]=useState<string>(new Date().getFullYear().toString())
    const [monthData,setMonthData]=useState<any>("")
    useEffect(() => {
        const token = localStorage.getItem("token");
        getRequest(`api/v1/user/payments/year/${year}`, { authorization: `Bearer ${token}`}).then((res:any) => {
              console.log("Overview Response:", res);
              if (res && res.success !== false){
                setMonthData(res.data)
              }else{
                redirect('/login')
              }
            });

    },[year])
    const currentMonth = new Date().getMonth().toString();
    console.log("Current Month:", currentMonth);
    const [selectedMonth, setSelectedMonth] = useState<number | null>(parseInt(currentMonth))
    return (
        <div className="  flex flex-col w-full  gap-3 ">
            <div className="">
                {/* <ButtonComponent iconClassName="ml-1" baseClassName="w-auto h-auto p-3 !rounded-lg " buttonIcon={<SlCalender />} buttonText={`${year}`} /> */}
                <YearDropDown year={year} setYear={setYear} joinYear={monthData.joiningYear} />
            </div>
            <div className="w-full grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2   gap-2">
                {
                    monthData?.months?.map((month: { 
                        month: string,
                        status: string,
                        monthNumber: number
                    }) => (
                        <MonthCard status={month.status} key={month.monthNumber} month={month.month} selected={parseInt(currentMonth) === selectedMonth} onClick={() => setSelectedMonth(month.monthNumber)} />
                    ))
                }
            </div>
        </div>
    );
}
