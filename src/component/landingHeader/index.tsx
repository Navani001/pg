"use client";
import { Image } from "@heroui/react";
import React, { useState } from "react";
import { ButtonComponent } from "../button";
import { FaFacebookSquare } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { PiInstagramLogoFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
export const LandingNavBar = () => {

const router=useRouter();
    return (
        <div className="h-[80px] px-5 w-full shadow-md z-20 flex justify-between items-center">
            <div className=" flex gap-4">
                {/* <div className="rounded-full w-14 h-14 bg-gray-200 flex items-center justify-center">hi</div> */}
                <Image src="/logo.png" radius="full" loading="eager" width={50} height={50} classNames={{
                    "img": " object-cover "
                }} alt="Logo" />
                <div className="font-bold text-lg font-poppins items-center justify-center hidden sm:flex">MRM PG</div>

            </div>

            <div className="flex gap-2 sm:gap-10 items-center ">
                <div className="flex gap-2 sm:gap-5">
                    <PiInstagramLogoFill className="text-[#FF4B52] text-2xl cursor-pointer" />
                    <FaFacebookSquare className="text-[#FF4B52] text-2xl cursor-pointer" />
                    <RiWhatsappFill className="text-[#FF4B52] text-2xl cursor-pointer" />
                </div>
                <ButtonComponent
                    isIcon={false}
                    ButtonVariant="solid"
                    buttonText="Login"
                    handleOnClick={() => {
                        router.push('/login')
                    }}
                    baseClassName="rounded-2xl w-auto h-auto py-2 px-2 sm:px-10 text-white bg-[#FF4B52] hover:bg-[#e63946] active:bg-[#d62828] border-none"
                />
            </div>

        </div>
    );
};
