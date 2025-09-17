"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ButtonComponent } from "../button";
import { InputField } from "../input";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error) {
      console.error("Login failed:", response.error);
      setIsLoading(false);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="w-[80%]  mx-auto h-auto lg:h-[85vh] rounded-2xl border border-white/40 flex flex-col md:flex-row justify-center items-center backdrop-blur-md shadow-lg p-4 sm:p-6 font-medium">
      {/* Left Image Section */}
      <div className="hidden h-full lg:h-[85%] w-full md:flex md:w-1/2 lg:w-2/5 items-center justify-center">
        <div className="w-full h-full sm:h-[400px] lg:h-full bg-[url('/loginImage.jpg')] bg-cover bg-center rounded-2xl shadow-md" />
      </div>

      {/* Right Login Form Section */}
      <div className="w-full lg:h-[70%] md:w-1/2 lg:w-3/5 flex items-center justify-center">
        <div className="w-full h-full   bg-white/25 backdrop-blur-lg rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-md p-6 sm:p-8 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <div className="flex flex-col gap-6">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Username</label>
              <InputField
                value={email}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName="bg-white rounded-md"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Password</label>
              <InputField
                type="password"
                value={password}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName="bg-white rounded-md"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <ButtonComponent
              buttonText={isLoading ? "Loading..." : "Login"}
              textClassName="text-base font-semibold"
              baseClassName="bg-gradient-to-r from-red-500 to-pink-500 px-8 sm:px-10 py-2 rounded-lg text-white shadow-md hover:opacity-90 transition"
              isIcon={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
