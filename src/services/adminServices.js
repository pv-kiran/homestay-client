import axiosInstance from "../api/axiosInstance";
import apiEndpoints from "../api/endpoints";

const adminService = {
  adminSignup: async (adminData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Signup,
        JSON.stringify(adminData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminOtpVerification: async (otpData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_OtpVerify,
        JSON.stringify(otpData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminSignIn: async (userData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Signin,
        JSON.stringify(userData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminLogout: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_LogOut
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
