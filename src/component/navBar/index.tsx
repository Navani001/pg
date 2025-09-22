"use client";
import { useState } from "react";
import { Image } from "@heroui/react";
import { IoReorderThree, IoClose } from "react-icons/io5";
import { Sidebar } from "../sideBar";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="h-[80px] px-5 w-full shadow-md z-20 flex justify-between items-center bg-white">
        <div className="flex gap-4 items-center">
          {/* Menu Button - only visible on mobile */}
          <button
            className="block lg:hidden text-3xl"
            onClick={() => setIsOpen(true)}
          >
            <IoReorderThree />
          </button>

          {/* Logo */}
          <Image
            src="/logo.png"
            radius="full"
            loading="eager"
            width={50}
            height={50}
            classNames={{
              img: "object-cover",
            }}
            alt="Logo"
          />
          <div className="font-bold text-lg font-poppins flex items-center justify-center">
            MRM PG
          </div>
        </div>

        {/* Profile Image */}
        <Image
          src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
          radius="full"
          loading="lazy"
          width={50}
          height={50}
          classNames={{
            img: "object-cover",
          }}
          alt="profile"
        />
      </div>

      {/* Sidebar Overlay (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>

        {/* Sidebar Component */}
        <Sidebar />
      </div>
    </>
  );
};
