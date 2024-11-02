import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowRight, Chrome, Timer } from 'lucide-react';
// import { Modal } from './Modal';
// import { Button } from './Button';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { GoogleLogin } from '@react-oauth/google';
import CustomGoogleLogin from './Login';

const emailSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

const otpSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits')
    .matches(/^[0-9]+$/, 'Only numbers are allowed'),
});


export function SignupModal({ isOpen, onClose }) {
  const [showOTP, setShowOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    resetField: resetEmailField,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    resetField: resetOTPField,
    formState: { errors: otpErrors, isSubmitting: isOTPSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  useEffect(() => {
    let timer;
    
    if (showOTP && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      resetOTPField('otp');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showOTP, timeLeft, resetOTPField]);

  const onEmailSubmit = async (data) => {
    console.log('Email submitted:', data.email);
    setShowOTP(true);
    setTimeLeft(120); // Reset timer when OTP is sent
  };

  const onOTPSubmit = async (data) => {
    if (timeLeft === 0) {
      console.log('OTP has expired');
      return;
    }
    console.log('OTP submitted:', data.otp);
    // Handle OTP verification here
  };

  const handleClose = () => {
    resetEmailField('email');
    resetOTPField('otp');
    setShowOTP(false);
    setTimeLeft(120);
    onClose();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = () => {
    resetOTPField('otp');
    setTimeLeft(120);
    // Add your resend OTP logic here
    console.log('Resending OTP...');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showOTP ? 'Enter OTP' : 'Welcome'}
      description={
        showOTP
          ? 'Please enter the verification code sent to your email'
          : 'Sign up to start booking your perfect homestay'
      }
    >
      {!showOTP ? (
        <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                {...registerEmail('email')}
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-turquoise-500 focus:outline-none focus:ring-1 focus:ring-turquoise-500"
              />
            </div>
            {emailErrors.email && (
              <p className="mt-1 text-xs text-red-500">{emailErrors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isEmailSubmitting}
          >
            Generate OTP
            <ArrowRight className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

        
            {/* <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
         <CustomGoogleLogin/>
          
        </form>
      ) : (
        <form onSubmit={handleOTPSubmit(onOTPSubmit)} className="space-y-4">
          <div className="space-y-2">
            <input
              {...registerOTP('otp')}
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-lg tracking-[0.5em] placeholder:text-gray-400 focus:border-turquoise-500 focus:outline-none focus:ring-1 focus:ring-turquoise-500"
              maxLength={6}
            />
            {otpErrors.otp && (
              <p className="mt-1 text-xs text-red-500">{otpErrors.otp.message}</p>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Timer className="mr-1 h-4 w-4" />
                <span className={timeLeft <= 30 ? 'text-red-500' : ''}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleResendOTP}
                className={`text-turquoise-500 hover:text-turquoise-600 ${
                  timeLeft > 0 ? 'cursor-not-allowed opacity-50' : ''
                }`}
                disabled={timeLeft > 0}
              >
                Resend OTP
              </button>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isOTPSubmitting}
            disabled={timeLeft === 0}
          >
            Verify OTP
          </Button>

          {/* <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => setShowOTP(false)}
          >
            Back to email
          </Button> */}
        </form>
      )}
    </Modal>
  );
}