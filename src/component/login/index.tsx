"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonComponent } from "../button";
import { InputField } from "../input";
import { getRequest, postRequest } from "@/utils";
import SnackBar from "../snackBar";

export const Login = () => {
  const router = useRouter();
  const [reset, setReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarData, setSnackbarData] = useState<
    {
      message: string,
      severity: 'success' | 'error' | 'info' | 'warning'
    }>({
      message: "test",
      severity: "success"
    })
  const handleLogin = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    if(reset){
    
      postRequest("api/v1/user/reset-password", { email, newPassword:newPassword.newPassword,confirmPassword:newPassword.confirmPassword },
        { authorization: `Bearer ${token}` }
      )
        .then((res: any) => {
          setIsLoading(false);

          // Check if login was successful - adjust this condition based on your API response structure
          if (res && res.success !== false) {
            

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
          // Handle network errors or other failures
        });
        return;

    }
    console.log({email,password})
    postRequest("api/v1/user/login", { email, password })
      .then((res: any) => {
        setIsLoading(false);

        // Check if login was successful - adjust this condition based on your API response structure
        if (res && res.success !== false) {
          // Redirect to dashboard on success
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
          message:  "Login failed. Please try again.",
          severity: "error"
        })
        setSnackbarOpen(true);
        // Handle network errors or other failures
      });
  };

  return (
    <div className="w-[100%] xl:w-[70%] lg:w-[75%] mx-auto h-[70%] lg:h-[85vh] rounded-2xl border border-white/40 flex flex-col md:flex-row justify-center items-center backdrop-blur-md shadow-lg p-4 sm:p-6 font-medium">
      {/* Left Image Section */}
      <SnackBar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackBarData.message}
        severity={snackBarData.severity}
        autoHideDuration={4000}
      /> 
      <div className="hidden h-full lg:h-[85%] w-full md:flex md:w-1/2 lg:w-2/5 items-center justify-center">
        <div className="w-full h-full sm:h-[400px] lg:h-full bg-[url('/loginImage.jpg')] bg-cover bg-center rounded-2xl shadow-md" />
      </div>

      {/* Right Login Form Section */}
      <div className="w-full lg:h-[70%] md:w-1/2 xl:w-3/5  flex items-center justify-center">
        <div className="w-full h-full   bg-white/25 backdrop-blur-lg rounded-2xl md:rounded-l-none md:rounded-r-2xl shadow-md p-6 sm:p-8 flex flex-col justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
            Login
          </h2>

          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Email</label>
              <InputField
                value={email}
                inputOnChange={(e) => setEmail(e.target.value)}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName=" rounded-md !bg-transparent"
              />
            </div>

            {/* Password */}
           {!reset && <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Password</label>
              <InputField
                type="password"
                inputOnChange={(e) => setPassword(e.target.value)}
                value={password}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName=" rounded-md !bg-transparent"
              />
            </div>}
            {reset && <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">New Password</label>
              <InputField
                type="password"
                inputOnChange={(e) => setNewPassword({...newPassword,newPassword:e.target.value})}
                value={newPassword.newPassword}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName=" rounded-md !bg-transparent"
              />
            </div>}
            {reset && <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Confirm Password</label>
              <InputField
                type="password"
                inputOnChange={(e) => setNewPassword({ ...newPassword, confirmPassword: e.target.value })}
                value={newPassword.confirmPassword}
                inputWrapperClassName="h-[3rem]"
                mainWrapperClassName=" rounded-md !bg-transparent"
              />
            </div>}
          </div>

          {/* Button */}
          <div className="flex justify-center mt-6">
            <ButtonComponent
              buttonText={isLoading ? "Loading..." : "Login"}
              textClassName="text-base font-semibold"
              baseClassName="bg-gradient-to-r from-red-500 to-pink-500 px-8 sm:px-10 py-2 rounded-lg text-white shadow-md hover:opacity-90 transition"
              isIcon={false}
              handleOnClick={() => {
                handleLogin();
              }
                // router.push("/dashboardLayout/dashboard")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
