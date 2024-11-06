import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import DateOfBirth from '../common/DateOfBirth';
import { useSelector } from 'react-redux';

// Custom validation for checking if all DOB fields are filled
const isDobComplete = (dob) => {
  return dob.date && dob.month && dob.year;
};

// Function to calculate age
const calculateAge = (dob) => {
  const birthDate = new Date(dob.year, dob.month - 1, dob.date);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const schema = yup.object({
  fullName: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Full name should contain only alphabets')
    .required('Full name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export const UserDataForm = ({ submitHandler, isLoading }) => {
  const {authState} = useSelector((state) => {
        return state.userAuth;
  })
  const [dob, setDob] = useState({
    date: '',
    month: '',
    year: ''
  });
  const [dobError, setDobError] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleDobChange = (name, value) => {
    const newDob = {
      ...dob,
      [name]: value
    };
    setDob(newDob);
    
    // Clear error when user starts modifying the fields
    setDobError('');
  };

  const validateDobAndSubmit = (formData) => {
    // Check if all DOB fields are filled
    if (!isDobComplete(dob)) {
      setDobError('Please fill in all date of birth fields');
      return;
    }

    // Check age restriction
    const age = calculateAge(dob);
    if (age < 18) {
      setDobError('You must be at least 18 years old');
      return;
    }

    // If all validations pass, submit the form with DOB data
    submitHandler({
      ...formData,
      dob: `${dob.year}-${dob.month.padStart(2, '0')}-${dob.date.padStart(2, '0')}`,
      userId: authState?.userId
    });
  };

  useEffect(() => {
    if (!authState?.accountCreationStatus) {
      setValue("email", authState?.email);
      setValue("fullName", authState?.name ? authState?.name : "");
    }
  }, [authState]);

  return (
    <form onSubmit={handleSubmit(validateDobAndSubmit)} className="space-y-6 p-6">
      <FormField
        type="text"
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        register={register}
        error={errors.fullName}
      />
      <FormField
        type="text"
        name="email"
        label="Email"
        placeholder="Enter your email name"
        register={register}
        error=""
        disabled
      />
      <div>
        <DateOfBirth
          dob={dob}
          handleDob={handleDobChange}
        />
        {dobError && (
          <p className="mt-1 text-xs text-red-500">{dobError}</p>
        )}
      </div>
      <div className='ml-1'>
        <FormField
          type="checkbox"
          name="isMarketingAllowed"
          label="Terms"
          placeholder="I agree to receive emails from Bestays"
          register={register}
          error={errors.terms}
        />
      </div>
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
      >
        Submit
      </Button>
    </form>
  );
};