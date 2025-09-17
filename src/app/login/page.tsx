"use client";
import { Login } from "@/component";
export default function LoginPage() {
  return (
    <div className="h-screen bg-[url(/loginBgImage.png)] w-screen bg-cover flex items-center justify-center p-4 font-inter">
      <Login />
      {/* <InputField/> */}
    </div>
  );
}
