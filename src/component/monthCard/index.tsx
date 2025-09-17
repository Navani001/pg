"use client"

import type React from 'react';
import { Chip } from '../chip';
import { cn } from '@heroui/react';
interface MonthCardProps {
    month?: string;
    status?: string;
    selected?:boolean

}
interface LabelType{
    text:string,
    className:string,
}
export const MonthCard = (
props:MonthCardProps) => {
    const {
        month,
        status,
        selected
    } = props
    const label:LabelType = (() => {
        switch(status){
            case "pending": 
                return {className:"bg-primary text-white",text:"pending"};
            case "upload": 
                return {className:"bg-success text-white",text:"upload"};
            default: 
                return {className:"",text:""};
        }
    })();
     const monthShort = (() => {
        switch(month?.toLowerCase()){
            case "january": 
                return "Jan";
            case "february": 
                return "Feb";
            case "march": 
                return "Mar";
            case "april": 
                return "Apr";
            case "may": 
                return "May";
            case "june": 
                return "Jun";
            case "july": 
                return "Jul";
            case "august": 
                return "Aug";
            case "september": 
                return "Sep";
            case "october": 
                return "Oct";
            case "november": 
                return "Nov";
            case "december": 
                return "Dec";
            default: 
                return month || "";
        }
    })();
	return (
		<div className={cn('border border-primary-50 p-2 max-w-[308px] flex justify-center items-center rounded-lg',{ "bg-primary-50": selected })}>
        <div className='flex flex-col  w-full '>
         <div className={cn('font-semibold text-md ',{"text-white": selected})}>{month}</div>
         <div className={cn('',{"text-white": selected})}>Paid on Jan 05</div>
        </div>
       {label.text!='' && <Chip label={label.text} className={label.className} />}
        </div>
	);
};