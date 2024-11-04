import React, { useState, useEffect } from 'react';

import { Modal } from './common/Modal';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { EmailForm } from './forms/EmailForm';
import { OtpForm } from './forms/OtpForm';
import { UserDataForm } from './forms/UserDataForm';
import GoogleLogin from './GoogleLogin';
import { useDispatch } from 'react-redux';
import { setAuth } from '../app/features/users/authSlice';

export function SignupModal({ isOpen, onClose }) {
  const [showFlow, setShowFlow] = useState({
    otpGenerate: true,
    otpVerify: false,
    finishScreen: false
  });

  const [timeLeft, setTimeLeft] = useState(120);

  const {
    data: emailData,
    error: emailError,
    loading: emailLoading,
    execute: signUpUser,
    success: emailSuccess,
    reset: resetEmailState
  } = useApi(userService.UserSignup);

  const {
    data: otpData,
    error: otpError,
    loading: otpLoading,
    execute: verifyOtp,
    success: otpSuccess,
    reset: resetOtpState
  } = useApi(userService.UserOtpVerification);

  const {
    data: userData,
    error: userError,
    loading: userLoading,
    execute: userDataSubmit,
    success: userSuccess,
    reset: userDataReset
  } = useApi(userService.UserAccountSetUp);

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
    signUpUser({ email: data.email });
  };

  const handleOTPSubmit = async (data) => {
    if (timeLeft === 0) {
      console.log('OTP has expired');
      return;
    }
    verifyOtp({
      email: emailData?.user?.email,
      otp: data.otp
    });
  };

  

  const handleClose = () => {
    setShowFlow({ otpGenerate: true, otpVerify: false, finishScreen: false });
    setTimeLeft(120);
    resetEmailState();
    resetOtpState();
    userDataReset();
    onClose();
  };


  const handleResendOTP = () => {
    setTimeLeft(120);
    console.log('Resending OTP...');
  };

  useEffect(() => {
    if (emailSuccess) {
      setShowFlow({ otpGenerate: false, otpVerify: true, finishScreen: false });
      setTimeLeft(120);
    }
    if (otpSuccess) {
      localStorage.setItem('user', JSON.stringify(otpData?.userDetails));
      dispatch(setAuth());
      if (!otpData?.userDetails?.accountCreationStatus) {
        setShowFlow({ otpGenerate: false, otpVerify: false, finishScreen: true });
      } else {
        handleClose();
      }
    }
    if (userSuccess) {
      handleClose();
    }
  }, [emailSuccess, otpSuccess, userSuccess,otpData]);

  const getTitle = () => {
    if (showFlow?.otpGenerate) return 'Welcome';
    if (showFlow?.otpVerify) return 'Enter OTP';
    if (showFlow?.finishScreen) return 'Finishing Signup';
  };

  const getDescription = () => {
    if (showFlow?.otpGenerate) return 'Sign up to start booking your perfect homestay';
    if (showFlow?.otpVerify) return 'Please enter the verification code sent to your email';
    if (showFlow?.finishScreen) return '';
  };

  const handleGoogleAuthSucces = (user) => {
    if (!user?.accountCreationStatus) {
      setShowFlow({
        otpGenerate: false,
        otpVerify: false,
        finishScreen: true
      })
    } else {
      handleClose();
    }
  }

  const handleUserDataSubmit = (data) => {
    userDataSubmit(data)
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      description={getDescription()}
    >
      {showFlow?.otpGenerate && (
        <>
          <EmailForm
            onSubmit={handleEmailSubmit}
            isLoading={emailLoading}
          />
          <GoogleLogin
            handleSuccess={handleGoogleAuthSucces} 
          />
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