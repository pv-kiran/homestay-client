import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormField } from './common/FormField';
import { Button } from './common/Button';
import DateOfBirth from './common/DateOfBirth';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
  preference: yup.object({
    label: yup.string().required(),
    value: yup.string().required(),
  }).required('Please select a preference'),
  interests: yup.array().required().min(1, 'Please select at least one interest'),
  subscription: yup.string().required('Please select a subscription type'),
  terms: yup.boolean().oneOf([true], 'You must accept the terms'),
  dob: yup.string().required('Date is required')
});

export function FormExample() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting,errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      <FormField
        type="text"
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        register={register}
        error={errors.fullName}
      />

      <FormField
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
      />

      <FormField
        type="textarea"
        name="message"
        label="Message"
        placeholder="Enter your message"
        register={register}
        error={errors.message}
      />

      <FormField
        type="select"
        name="preference"
        label="Theme Preference"
        control={control}
        register={register}
        error={errors.preference}
        options={[
          { label: 'Light Theme', value: 'light' },
          { label: 'Dark Theme', value: 'dark' },
          { label: 'System Theme', value: 'system' },
        ]}
      />

      <FormField
        type="select"
        name="interests"
        label="Interests"
        control={control}
        register={register}
        error={errors.interests}
        isMulti={true}
        options={[
          { label: 'Programming', value: 'programming' },
          { label: 'Design', value: 'design' },
          { label: 'Business', value: 'business' },
          { label: 'Marketing', value: 'marketing' },
          { label: 'Writing', value: 'writing' },
        ]}
      />

      <FormField
        type="radio"
        name="subscription"
        label="Subscription Type"
        register={register}
        error={errors.subscription}
        options={[
          { label: 'Free', value: 'free' },
          { label: 'Pro', value: 'pro' },
          { label: 'Enterprise', value: 'enterprise' },
        ]}
      />

      <FormField
        type="checkbox"
        name="terms"
        label="Terms"
        placeholder="I accept the terms and conditions"
        register={register}
        error={errors.terms}
      />
      <div className='w-6/12'>
        <FormField
          type="date"
          name="dob"
          label="Date of Birth"
          placeholder="Date of Birth"
          register={register}
          control={control}
          error={errors.dob}
        />
      </div>
      <DateOfBirth/>

     <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
}