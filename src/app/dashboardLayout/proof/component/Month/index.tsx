"use client"

import { ButtonComponent, MonthCard, Sidebar } from "@/component";
import { SlCalender } from "react-icons/sl";
import { DetailProof } from "../details";
import { useEffect, useState } from "react";
import { YearDropDown } from "../yearDrop";
import { getRequest } from "@/utils";
import { redirect } from "next/navigation";

export function Month({ monthData, setMonthData, year, setYear, selectedMonth ,setSelectedMonth}:{monthData:any,setMonthData:any,year:string,setYear:any
,selectedMonth:number,setSelectedMonth:any
}) {
    var months:any = {"January":1, "February":2, "March":3, "April":4, "May":5, "June":6, "July":7, "August":8, "September":9, "October":10, "November":11, "December":12};
    const getMonthName = (monthString: string) => {
        return monthString.split(' ')[0];
    };
        console.log("Month Data:", monthData?.months);
   

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
                        <MonthCard status={month.status} monthNumber={month.monthNumber}
                         key={month.month} month={month.month} 
                            selected={months[getMonthName(month.month)] === selectedMonth } 
                            onClick={() => setSelectedMonth(months[getMonthName(month.month)])} />
                    ))
                }
            </div>
        </div>
    );
}
