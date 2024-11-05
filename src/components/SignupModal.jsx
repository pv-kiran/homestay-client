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
      console.log("OTP has expired");
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
      alert(result?.message);
    }
  };

  const handleUserDataSubmit = async (data) => {
    const result = await userDataSubmit(data);
    if (result) {
      handleClose();
    }
  };

  useEffect(() => {
    if (emailError) {
      alert(emailError?.message);
    }
    if (otpError) {
      alert(otpError?.message);
    }
    if (userError) {
      alert(userError?.message);
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
