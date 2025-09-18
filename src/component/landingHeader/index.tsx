"use client";
import { Image } from "@heroui/react";
import React, { useState } from "react";
import { ButtonComponent } from "../button";
import { FaFacebookSquare } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { PiInstagramLogoFill } from "react-icons/pi";
export const LandingNavBar = () => {


    return (
        <div className="h-[80px] px-5 w-full shadow-md z-20 flex justify-between items-center">
            <div className=" flex gap-4">
                {/* <div className="rounded-full w-14 h-14 bg-gray-200 flex items-center justify-center">hi</div> */}
                <Image src="/logo.png" radius="full" loading="eager" width={50} height={50} classNames={{
                    "img": " object-cover "
                }} alt="Logo" />
                <div className="font-bold text-lg font-poppins flex items-center justify-center">MRM PG</div>

            </div>

           <div className="flex gap-10 items-center ">
            <div className="flex gap-5">
                    <PiInstagramLogoFill className="text-[#FF4B52] text-2xl" />
                    <FaFacebookSquare className="text-[#FF4B52] text-2xl" />
                    <RiWhatsappFill className="text-[#FF4B52] text-2xl" />
            </div>
                <ButtonComponent isIcon={false} buttonText="Register" baseClassName="bg-[#FF4B52] rounded-2xl w-auto h-auto py-2 px-10 text-white"/>
           </div>

        </div>
    );
};
