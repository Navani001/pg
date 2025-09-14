"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { InputField } from "../input";
import { ButtonComponent } from "../button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    // Add login logic here
    signIn("credentials", {
      email,
      password,
      redirect: false, // Prevent automatic redirect
    }).then((response) => {
      if (response?.error) {
        console.error("Login failed:", response.error);
        setIsLoading(false);
      } else {
        // Handle successful login, e.g., redirect to dashboard
        window.location.href = "/dashboard"; // Adjust the redirect path as needed
      }
    });
    setTimeout(() => setIsLoading(false), 2000); // Simulate loading
  };

  return (
    <div className="w-[70%] !h-[900px] rounded-3xl border-white border-2 flex justify-center items-center backdrop-blur-[22px] shadow-md   p-8 pt-10  font-medium">
    <div className=" w-[90%] h-[80%] flex justify-center items-center">
    <div className="w-[469px] h-[642px] bg-[url(/loginImage.jpg)] bg-cover rounded-3xl flex justify-center items-center"/>   
    <div className="w-[50%] h-full justify-center items-center">
  <div className="w-full h-full flex justify-center items-center ">
  <div className="flex w-[593px] justify-between items-center flex-col h-[547px] bg-white/45 rounded-r-3xl backdrop-blur-[22px]">
    <div className="flex flex-col w-[95%] justify-between h-full p-8">
      <div className="h-[10%] font-mont font-bold text-2xl flex justify-center items-center">Login </div>
    <div className="py-5 flex flex-col gap-6 h-[60%]">
    <div className="flex flex-col gap-4">
    <span className=" font-mont font-bold text-xl">Username</span>
        <InputField inputWrapperClassName="h-[3.5rem]" mainWrapperClassName="bg-transparent" className=""/>
      </div>
      <div className="flex flex-col gap-4 mt-1">
    <span className=" font-mont font-bold text-xl">Password</span>
      <InputField inputWrapperClassName="h-[3.5rem]" mainWrapperClassName="bg-transparent" className=""/>
      </div>
    </div>
      <div className="flex items-center justify-center h-[20%]"><ButtonComponent  buttonText="Login"  textClassName="text-xl" baseClassName="bg-primary border-0 h-auto py-3 rounded-xl text-white" isIcon={false}/></div>
    </div>
  </div>
  
  
  </div>
</div>
    </div>
    </div>
  );
};

export default Login;
