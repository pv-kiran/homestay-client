import React from "react";
import { FormField } from "../common/FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const adminSignUpSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Name should contain alphabets only")
    .min(4, "Fullname length must be at least 4 characters long"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    ),
});

const AdminSignupForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(adminSignUpSchema),
  });

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          type="text"
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          register={register}
          error={errors.name}
          className="focus:ring-indigo-500 focus:border-indigo-500"
        />

        <FormField
          type="email" // Changed type to "email" for correct input type
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          className="focus:ring-indigo-500 focus:border-indigo-500"
        />

        <FormField
          type="password" // Changed to "password" for security
          name="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          className="focus:ring-indigo-500 focus:border-indigo-500"
        />

        <Button type="submit" fullWidth isLoading={isLoading}>
          Generate OTP
          <ArrowRight className="absolute right-3 transform transition-transform group-hover:translate-x-1 h-5 w-5 opacity-0 group-hover:opacity-100" />
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          to={"/admin/signin"}
          className=" text-turquoise-500 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default AdminSignupForm;
