import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../common/Button';
import { FormField } from '../common/FormField';
import DateOfBirth from '../common/DateOfBirth';

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
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

export const UserDataForm = ({ submitHandler, isLoading }) => {
  const [dob, setDob] = useState({
    date: '',
    month: '',
    year: ''
  });
  const [dobError, setDobError] = useState('');

  const {
    register,
    control,
    handleSubmit,
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
      dob: `${dob.year}-${dob.month.padStart(2, '0')}-${dob.date.padStart(2, '0')}`
    });
  };

  return (
    <form onSubmit={handleSubmit(validateDobAndSubmit)} className="space-y-6 p-6">
      <FormField
        type="text"
        name="firstName"
        label="First Name"
        placeholder="Enter your First name"
        register={register}
        error={errors.firstName}
      />
      <FormField
        type="text"
        name="lastName"
        label="Last Name"
        placeholder="Enter your Last name"
        register={register}
        error={errors.lastName}
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
          name="terms"
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