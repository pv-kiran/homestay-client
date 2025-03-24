import React, { useState, useEffect } from "react";

import { Modal } from "./common/Modal";
import useApi from "../hooks/useApi";
import userService from "../services/userServices";
import { EmailForm } from "./forms/EmailForm";
import { OtpForm } from "./forms/OtpForm";
import { UserDataForm } from "./forms/UserDataForm";
import GoogleLogin from "./GoogleLogin";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/features/users/authSlice";
import getOtpExpiryInSeconds from "./../utils/otpExpiry";
import { toast } from "react-toastify";
import { Sparkles } from "lucide-react";

export function SignupModal({ isOpen, onClose }) {
  const [showFlow, setShowFlow] = useState({
    otpGenerate: true,
    otpVerify: false,
    finishScreen: false,
  });

  const [timeLeft, setTimeLeft] = useState(120);

  const {
    data: emailData,
    error: emailError,
    loading: emailLoading,
    execute: signUpUser,
    success: emailSuccess,
    reset: resetEmailState,
  } = useApi(userService.UserSignup);

  const {
    error: otpError,
    loading: otpLoading,
    execute: verifyOtp,
    reset: resetOtpState,
  } = useApi(userService.UserOtpVerification);

  const {
    error: userError,
    loading: userLoading,
    execute: userDataSubmit,
    reset: userDataReset,
  } = useApi(userService.UserAccountSetUp);

  const {
    data: otpResendData,
    error: otpResendError,
    loading: otpResendLoading,
    execute: otpResend,
  } = useApi(userService.UserOtpResend);

  const dispatch = useDispatch();

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

  const showWelcomeToast = async (username = "User") => {
    try {      
      toast(
        <div className="flex items-center gap-3 py-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-turquoise-400 to-turquoise-600 rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-turquoise-700">
              Welcome, <span className="font-semibold">{username?.split(" ")[0]}</span>! ✨
            </p>
            <p className="text-sm text-gray-500">We're glad to see you.</p>
          </div>
        </div>,
        {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: "!bg-white !rounded-xl !shadow-xl !px-4",
          bodyClassName: "!p-0",
          progressClassName: "!bg-gradient-to-r !from-turquoise-400 !to-turquoise-600"
        }
      );
    } catch (error) {
      toast.error('Failed to load user data. Please try again.', {
        position: "bottom-center",
        className: "!bg-white !rounded-xl !shadow-xl",
      });
    }
  };

  const handleEmailSubmit = async (data) => {
    const result = await signUpUser({ email: data.email });
    if (result) {
      setShowFlow({ otpGenerate: false, otpVerify: true, finishScreen: false });
      const timer = getOtpExpiryInSeconds(result?.otpExpiry);
      setTimeLeft(timer);
    }
  };

  const handleOTPSubmit = async (data) => {
    if (timeLeft === 0) {
      return;
    }
    const result = await verifyOtp({
      email: emailData?.user?.email,
      otp: data.otp,
    });
    if (result) {
      localStorage.setItem("user", JSON.stringify(result?.userDetails));
      dispatch(setAuth());
      if (!result?.userDetails?.accountCreationStatus) {
        setShowFlow({
          otpGenerate: false,
          otpVerify: false,
          finishScreen: true,
        });
      } else {
        handleClose();
        showWelcomeToast(result?.userDetails?.name);
      }
    }
  };

  const handleClose = () => {
    setShowFlow({ otpGenerate: true, otpVerify: false, finishScreen: false });
    setTimeLeft(120);
    resetEmailState();
    resetOtpState();
    userDataReset();
    onClose();
  };

  const handleResendOTP = async () => {
    const result = await otpResend({
      email: emailData?.user?.email,
    });
    if (result) {
      const leftTime = getOtpExpiryInSeconds(result?.otpExpiry);
      setTimeLeft(leftTime);
      toast.success(result?.message);
    }
  };

  const handleUserDataSubmit = async (data) => {
    const result = await userDataSubmit(data);
    if (result) {
      handleClose();
      showWelcomeToast(result?.user?.fullName);
    }
  };

  useEffect(() => {
    if (emailError) {
      toast.error(emailError?.message);
    }
    if (otpError) {
      toast.error(otpError?.message);
    }
    if (userError) {
      toast.error(userError?.message);
    }
  }, [emailError, otpError, userError]);

  const getTitle = () => {
    if (showFlow?.otpGenerate) return "Welcome";
    if (showFlow?.otpVerify) return "Enter OTP";
    if (showFlow?.finishScreen) return "Finishing Signup";
  };

  const getDescription = () => {
    if (showFlow?.otpGenerate)
      return "Sign up to start booking your perfect homestay";
    if (showFlow?.otpVerify)
      return "Please enter the verification code sent to your email";
    if (showFlow?.finishScreen) return "";
  };

  const handleGoogleAuthSucces = (user) => {
    if (!user?.accountCreationStatus) {
      setShowFlow({
        otpGenerate: false,
        otpVerify: false,
        finishScreen: true,
      });
    } else {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      description={getDescription()}>
      {showFlow?.otpGenerate && (
        <>
          <EmailForm onSubmit={handleEmailSubmit} isLoading={emailLoading} />
          <GoogleLogin handleSuccess={handleGoogleAuthSucces} />
        </>
      )}
      {showFlow?.otpVerify && (
        <OtpForm
          onSubmit={handleOTPSubmit}
          isLoading={otpLoading}
          timeLeft={timeLeft}
          onResendOtp={handleResendOTP}
          otpError={otpError}
          resetError={resetOtpState}
        />
      )}
      {showFlow?.finishScreen && (
        <UserDataForm
          submitHandler={handleUserDataSubmit}
          isLoading={userLoading}
        />
      )}
    </Modal>
  );
}
