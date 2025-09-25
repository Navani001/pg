"use client";
import { postRequest } from "@/utils";
import { Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEnvelope, FaEyeSlash, FaLock, FaRegEye } from "react-icons/fa";
import SnackBar from "../snackBar";

export const Login = () => {
  const router = useRouter();
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarData, setSnackbarData] = useState<{
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    message: "test",
    severity: "success",
  });
  const handleLogin = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if(reset){
      postRequest("api/v1/user/reset-password", { email, newPassword:newPassword.newPassword,confirmPassword:newPassword.confirmPassword },
        { authorization: `Bearer ${token}` }
      )
        .then((res: any) => {
          console.log("Password Reset Response:", res);
          setIsLoading(false);

          if (res && res.success !== false) {
            router.push("/user/dashboard");
            setSnackbarData({
              message: "Password reset successful!",
              severity: "success"
            })
            setSnackbarOpen(true);
          } else {
            setSnackbarData({
              message: res?.message || res?.error || "Password reset failed. Please try again.",
              severity: "error"
            })
            setSnackbarOpen(true);
            console.error("Password reset failed:", res?.message || res?.error || "Unknown error");
          }
        })
        .catch((error) => {
          console.error("Password reset request failed:", error);
          setIsLoading(false);
          setSnackbarData({
            message: "Password reset failed. Please try again.",
            severity: "error"
          })
          setSnackbarOpen(true);
        });
        return;
    }

    postRequest("api/v1/user/login", { email, password })
      .then((res: any) => {
        console.log("Login Response:", res);
        setIsLoading(false);

        if (res && res.success !== false) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.member.name);

          setReset(res.data.requirePasswordSetup);
          if(res.data.requirePasswordSetup){
            return;
          }
          router.push("/user/dashboard");
          setSnackbarData({
            message: "Login successful!",
            severity: "success"
          })
          setSnackbarOpen(true);
        } else {
          setSnackbarData({
            message: res?.message || res?.error || "Login failed. Please try again.",
            severity: "error"
          })
          setSnackbarOpen(true);
          console.error("Login failed:", res?.message || res?.error || "Unknown error");
        }
      })
      .catch((error) => {
        console.error("Login request failed:", error);
        setIsLoading(false);
        setSnackbarData({
          message: "Login failed. Please try again.",
          severity: "error"
        })
        setSnackbarOpen(true);
      });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* SnackBar */}
      <SnackBar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackBarData.message}
        severity={snackBarData.severity}
        autoHideDuration={4000}
      />

      {/* Background Image with Orange Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/b0/1d/90/b01d908e888398a74c4ed067d31e040b.jpg')`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 via-black/10 to-gray-900/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Login Form Container */}
        <div className="w-full max-w-md">
          <div className="backdrop-blur-lg bg-white/20 rounded-3xl p-8 shadow-2xl border border-white/30">
            {/* Welcome Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2 font-['Poppins']">
                {reset ? "Reset Password" : "Welcome!"}
              </h1>
              <p className="text-white/90 text-sm font-['Poppins']">
                {reset ? "Set up your new password" : "Sign in to continue"}
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-5">
              <div className="">
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  isRequired
                  labelPlacement="outside"
                  variant="bordered"
                  classNames={{
                    label: "text-sm text-white font-['Poppins']",
                    inputWrapper: "h-[40px]",
                  }}
                  startContent={<FaEnvelope className="text-gray-400" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Input */}
              {!reset && (
                <div className="pt-1">
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    isRequired
                    labelPlacement="outside"
                    variant="bordered"
                    classNames={{
                      label: "text-sm text-white font-['Poppins']",
                      inputWrapper: "h-[40px]",
                    }}
                    startContent={<FaLock className="text-gray-400" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endContent={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="focus:outline-none flex h-full items-center"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                        ) : (
                          <FaRegEye className="text-xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </div>
              )}

              {/* New Password Input */}
              {reset && (
                <div className="pt-1">
                  <Input
                    label="New Password"
                    placeholder="Enter your new password"
                    type="password"
                    isRequired
                    labelPlacement="outside"
                    variant="bordered"
                    classNames={{
                      label: "text-sm text-white font-['Poppins']",
                      inputWrapper: "h-[40px]",
                    }}
                    startContent={<FaLock className="text-gray-400" />}
                    value={newPassword.newPassword}
                    onChange={(e) => setNewPassword({...newPassword, newPassword: e.target.value})}
                  />
                </div>
              )}

              {/* Confirm Password Input */}
              {reset && (
                <div className="pt-1">
                  <Input
                    label="Confirm Password"
                    placeholder="Confirm your new password"
                    type="password"
                    isRequired
                    labelPlacement="outside"
                    variant="bordered"
                    classNames={{
                      label: "text-sm text-white font-['Poppins']",
                      inputWrapper: "h-[40px]",
                    }}
                    startContent={<FaLock className="text-gray-400" />}
                    value={newPassword.confirmPassword}
                    onChange={(e) => setNewPassword({...newPassword, confirmPassword: e.target.value})}
                  />
                </div>
              )}

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-lg font-['Poppins']"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  reset ? "RESET PASSWORD" : "LOGIN"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
