"use client";

import { NavBar, Sidebar } from "@/component";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <div className="h-[10vh] w-full">
        <NavBar />
      </div>
      <div className="h-[90vh] w-full flex">
        <div className="h-full w-1/6 hidden lg:flex">
          <Sidebar />
        </div>
        <div className="h-full w-full lg:w-5/6 p-4 md:p-6 overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
