import axiosInstance from "../api/axiosInstance";
import apiEndpoints from "../api/endpoints";

const userService = {
  UserSignup: async (emailData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Signup,
        JSON.stringify(emailData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UserGoogleSignup: async (token) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_GoogleSignIn,
        JSON.stringify(token)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UserOtpVerification: async (otpData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_OtpVerify,
        JSON.stringify(otpData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UserOtpResend: async (email) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_OtpResend,
        JSON.stringify(email)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UserAccountSetUp: async (userData) => {
    const { userId, fullName, dob, email, isMarketingAllowed } = userData;

    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_User_AccountSetUp.replace(":$userId", userId),
        JSON.stringify({
          fullName,
          email,
          dob,
          isMarketingAllowed,
        })
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  UserLogout: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_LogOut
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
