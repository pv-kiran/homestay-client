import axiosInstance from "../api/axiosInstance";
import apiEndpoints from "../api/endpoints";


const userService = {
  UserSignup: async (emailData) => {
    try {
      const response = await axiosInstance.post(apiEndpoints.Bestays_User_Signup, JSON.stringify(emailData));
      return response;
    } catch (error) {
      throw error;
    }
  },
    UserOtpVerification: async (otpData) => {
        console.log(otpData);
    try {
      const response = await axiosInstance.post(apiEndpoints.Bestays_User_OtpVerify, JSON.stringify(otpData));
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export default userService;