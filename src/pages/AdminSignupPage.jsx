import React, { useState, useEffect } from "react";
import useApi from "../hooks/useApi";
import adminService from "../services/adminServices";
import AdminSignupForm from "../components/forms/AdminSignupForm";
import { OtpForm } from "../components/forms/OtpForm";
import { useNavigate } from "react-router-dom";
import getOtpExpiryInSeconds from "../utils/otpExpiry";
import { toast } from "react-toastify";

export function AdminSignupPage() {
  const [showFlow, setShowFlow] = useState({
    otpGenerate: true,
    otpVerify: false,
  });

  const [message, setMessage] = useState("");

  const [timeLeft, setTimeLeft] = useState(120);

  const {
    data: adminData,
    error: adminError,
    loading: adminLoading,
    execute: adminSignUp,
  } = useApi(adminService.adminSignup);

  const {
    error: otpError,
    loading: otpLoading,
    execute: verifyOtp,
  } = useApi(adminService.adminOtpVerification);

  const { execute: resendOtp, data: resendOtpData } = useApi(
    adminService.adminOtpResend
  );

  const navigate = useNavigate();

  const handleAdminSignUp = async (data) => {
    const result = await adminSignUp(data);
    if (result) {
      setShowFlow({ otpGenerate: false, otpVerify: true });
      const leftTime = getOtpExpiryInSeconds(result?.otpExpiry);
      setTimeLeft(leftTime);
      setMessage(result?.message);
    }
  };

  const handleOTPSubmit = async (data) => {
    if (timeLeft === 0) {
      console.log("OTP has expired");
      return;
    }

    const result = await verifyOtp({
      email: adminData?.admin?.email,
      otp: data.otp,
    });

    if (result) {
      setShowFlow({ otpGenerate: true, otpVerify: false });
      navigate("/admin/signin");
    }
  };

  const handleResendOTP = async () => {
    const result = await resendOtp({ email: adminData?.admin?.email });
    if (result) {
      const leftTime = getOtpExpiryInSeconds(result?.otpExpiry);
      setTimeLeft(leftTime);
      setMessage(result?.message);
    }
  };

  useEffect(() => {
    let timer;
    if (showFlow.otpVerify && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showFlow, timeLeft]);

  useEffect(() => {
    if (adminError) {
      if (adminError?.isVerified) {
        toast.error(`${adminError?.message} You can signin`);
        navigate("/admin/signin");
      } else {
        toast.error(adminError?.message);
      }
    }
    if (otpError) {
      toast.error(otpError?.message);
    }
  }, [adminError, otpError]);

  return (
    <div className="h-screen flex items-center justify-center">
      {showFlow?.otpGenerate && (
        <AdminSignupForm
          onSubmit={handleAdminSignUp}
          isLoading={adminLoading}
          error={adminError} // Pass error to form
        />
      )}
      {showFlow?.otpVerify && (
        <div className="w-full max-w-md mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Enter OTP
          </h2>
          <p className="text-center text-gray-600 mb-6">{message}</p>

          <OtpForm
            onSubmit={handleOTPSubmit}
            isLoading={otpLoading}
            timeLeft={timeLeft}
            onResendOtp={handleResendOTP}
            error={otpError} // Pass error to form
            className="space-y-4"
          />
        </div>
      )}
    </div>
  );
}
