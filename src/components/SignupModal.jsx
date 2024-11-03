import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Mail, ArrowRight, Timer } from 'lucide-react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import GoogleLogin from './GoogleLogin';
import useApi from '../hooks/useApi';
import userService from '../services/userServices';
import { FormField } from './common/FormField';
import DateOfBirth from './common/DateOfBirth';


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

const schema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string().required('Date is required')
});


export function SignupModal({ isOpen, onClose }) {
  const [showFlow, setShowFlow] = useState({otpGenerate: true , otpVerify: false , finishScreen: false });
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

   const {
    register,
    control,
     handleSubmit,
    resetField:resetDateField,
    formState: { isSubmitting , errors: userDataErrors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let timer;
    
    if (showFlow.otpVerify && timeLeft > 0) {
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
  }, [showFlow, timeLeft, resetOTPField]);

  const onEmailSubmit = async (data) => {
    signUpUser({ email: data.email })
  };

  const onOTPSubmit = async (data) => {
    if (timeLeft === 0) {
      console.log('OTP has expired');
      return;
    }
    verifyOtp({
      email: emailData?.user?.email,
      otp:data.otp
    })
  };

  const handleUserDataSubmit = (data) => {
    console.log(data);
  }

  const handleClose = () => {
    resetEmailField('email');
    resetOTPField('otp');
    ('otp');

    setShowFlow({otpGenerate: true , otpVerify: false , finishScreen: false })
    setTimeLeft(120);
    resetEmailState();
    resetOtpState();
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


  useEffect(() => {
    if (emailSuccess) {
      setShowFlow({otpGenerate: false , otpVerify: true , finishScreen: false })
      setTimeLeft(120); 
    }
    if (otpSuccess) {
       setShowFlow({otpGenerate: false , otpVerify: false , finishScreen: true })
       localStorage.setItem('user', JSON.stringify(otpData?.userDetails));
    }
  }, [emailSuccess, otpSuccess])
  

  const getTitle = () => {
    if (showFlow?.otpGenerate) {
      return 'Welcome'
    }
    if (showFlow?.otpVerify) {
      return 'Enter OTP'
    }
    if (showFlow?.finishScreen) {
      return 'Finishing Signup'
    }
  }

  const getDescription = () => {
    if (showFlow?.otpGenerate) {
      return 'Sign up to start booking your perfect homestay'
    }
    if (showFlow?.otpVerify) {
      return 'Please enter the verification code sent to your email'
    }
    if (showFlow?.finishScreen) {
      return ``
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={getTitle()}
      description={getDescription()}
    >
      {showFlow?.otpGenerate ? (
        <>
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
              isLoading={emailLoading}
            >
              Generate OTP
              <ArrowRight className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            
            
          </form>
          <GoogleLogin handleClose={() => onClose()} />
        </>
      ) : null
      }
      {
        showFlow?.otpVerify ? <form onSubmit={handleOTPSubmit(onOTPSubmit)} className="space-y-4">
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
            isLoading={otpLoading}
            disabled={timeLeft === 0}
          >
            Verify OTP
          </Button>
        </form> : null
      }
      {
        showFlow?.finishScreen ? 
          <form onSubmit={handleSubmit(handleUserDataSubmit)} className="space-y-6 p-6">
            <FormField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="Enter your First name"
              register={register}
              error={userDataErrors.firstName}
            />
            <FormField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Enter your Last name"
              register={register}
              error={userDataErrors.lastName}
            />
            <DateOfBirth />
            <Button
              type="submit"
              fullWidth
              isLoading={emailLoading}
            >
              Submit
            </Button>
          </form>
         : null
      }
    </Modal>
  );
}



        