"use client";
import { Image } from "@heroui/react";
import React, { useState } from "react";

export const    NavBar = () => {
  

  return (
 <div className="h-[80px] px-5 w-full shadow-md z-20 flex justify-between items-center">
<div className=" flex gap-4">
  {/* <div className="rounded-full w-14 h-14 bg-gray-200 flex items-center justify-center">hi</div> */}
  <Image src="/logo.png" radius="full" loading="eager" width={50} height={50} classNames={{
    "img":" object-cover "
  }} alt="Logo" />
  <div className="font-bold text-lg font-poppins flex items-center justify-center">MRM PG</div>

</div>

  <Image src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww" radius="full" loading="lazy" width={50} height={50} classNames={{
    "img":" object-cover "
  }} alt="profile" />

 </div>
  );
};
