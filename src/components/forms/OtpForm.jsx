import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Timer } from 'lucide-react';
import { Button } from '../common/Button';

const otpSchema = yup.object({
  otp: yup
    .string()
    .required('OTP is required')
    .length(6, 'OTP must be 6 digits')
    .matches(/^[0-9]+$/, 'Only numbers are allowed'),
});

export const OtpForm = ({ onSubmit, isLoading, timeLeft, onResendOtp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <input
          {...register('otp')}
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-lg tracking-[0.5em] placeholder:text-gray-400 focus:border-turquoise-500 focus:outline-none focus:ring-1 focus:ring-turquoise-500"
          maxLength={6}
        />
        {errors.otp && (
          <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>
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
            onClick={onResendOtp}
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
        isLoading={isLoading}
        disabled={timeLeft === 0}
      >
        Verify OTP
      </Button>
    </form>
  );
};