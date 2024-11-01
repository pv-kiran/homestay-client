import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowRight, Chrome } from 'lucide-react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';

const emailSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

const otpSchema = yup.object({
  otp: yup.string().length(6, 'OTP must be 6 digits').required('OTP is required'),
});



export function SignupModal({ isOpen, onClose }) {
  const [showOTP, setShowOTP] = useState(false);
  
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    formState: { errors: otpErrors, isSubmitting: isOTPSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onEmailSubmit = async (data) => {
    console.log('Email submitted:', data.email);
    setShowOTP(true);
  };

  const onOTPSubmit = async (data) => {
    console.log('OTP submitted:', data.otp);
    // Handle OTP verification here
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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

          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => console.log('Google sign-up clicked')}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOTPSubmit(onOTPSubmit)} className="space-y-4">
          <div>
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
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isOTPSubmitting}
          >
            Verify OTP
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => setShowOTP(false)}
          >
            Back to email
          </Button>
        </form>
      )}
    </Modal>
  );
}