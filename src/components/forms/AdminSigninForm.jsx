import React, { useEffect } from "react";
import { FormField } from "../common/FormField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import adminService from "../../services/adminServices";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../app/features/users/authSlice";
import { toast } from "react-toastify";

const adminSigninSchema = yup.object({
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

const AdminSigninForm = () => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(adminSigninSchema),
  });

  const {
    data: adminData,
    error: adminError,
    loading: adminLoading,
    execute: adminSignIn,
    success: signInSuccess,
    reset: resetAdminFormState,
  } = useApi(adminService.adminSignIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    await adminSignIn(data);
  };

  useEffect(() => {
    if (signInSuccess) {
      localStorage.setItem("user", JSON.stringify(adminData?.admin));
      dispatch(setAuth());
      resetField("email", "");
      resetField("password", "");
      navigate("/admin");
    }
    if (adminError) {
      toast.error(adminError?.errorInfo);
    }
  }, [signInSuccess, adminError]);

  return (
    <div className="w-full max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Sign In to Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          register={register}
          error={errors.email}
          className="focus:ring-blue-500 focus:border-blue-500"
        />

        <FormField
          type="password" // Changed type to "password" for security
          name="password"
          label="Password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          className="focus:ring-blue-500 focus:border-blue-500"
        />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link
          to={"/admin/signup"}
          className="text-turquoise-400 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default AdminSigninForm;
