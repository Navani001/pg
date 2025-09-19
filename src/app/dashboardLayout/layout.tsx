"use client";

import { NavBar, Sidebar } from "@/component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100dvh] w-[100dvw] overflow-hidden">
      <div className="h-[10%] w-full">
        <NavBar />
        {/* <LandingNavBar/> */}
      </div>
      <div className="h-[90%] w-full flex">
        <div className="h-full w-1/6 hidden lg:flex">
          <Sidebar />
        </div>
        <div className="h-full w-full lg:w-5/6 overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
