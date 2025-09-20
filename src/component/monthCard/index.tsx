"use client"

import type React from 'react';
import { Chip } from '../chip';
import { cn } from '@heroui/react';
interface MonthCardProps {
    month?: string;
    status?: string;
    selected?:boolean
    onClick?:()=>void
    monthNumber?:number

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
        selected,
        onClick,
        monthNumber
    } = props
    const label:LabelType = (() => {
        switch(status){
            case "Pending": 
                return {className:"bg-primary text-white",text:"pending"};
            case "upload": 
                return {className:"bg-success text-white",text:"upload"};
            default: 
                return {className:"",text:""};
        }
    })();
    
	return (
		<div onClick={onClick}  className={cn('border min-w-[240px]  p-2 max-w-[308px] flex justify-center items-center rounded-lg',{ "bg-primary-50": selected })}>
        <div className='flex flex-col  w-full '>
         <div className={cn('font-semibold text-md ',{"text-white": selected})}>{month}</div>
                <div className={cn('', { "text-white": selected })}>{status == "Pending" ? "DUE" : "PAID"} on {month?.slice(0,3)} {monthNumber}</div>
        </div>
       {label.text!='' && <Chip label={label.text} className={label.className} />}
        </div>
	);
};