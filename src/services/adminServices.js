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
  adminSignIn: async (adminData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Signin,
        JSON.stringify(adminData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminOtpResend: async (email) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Otp_Resend,
        JSON.stringify(email)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminLogout: async () => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_LogOut
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminCategoryAdd: async (categoryData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Category_Add,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllCategory: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Category_Get_All
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleCategory: async (categoryId) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Category_Toggle.replace(":$categoryId", categoryId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminCategoryEdit: async ({ formData, categoryId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Category_Edit.replace(
          ":$categoryId", categoryId
        ),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminAmenitiesAdd: async (amenityData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Amenities_Add,
        amenityData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllAmenities: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Amenities_Get_All
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleAmenity: async (amenityId) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Amenities_Toggle.replace(":$amenityId", amenityId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminAmenityEdit: async ({ formData, amenityId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Amenities_Edit.replace(
          ":$amenityId", amenityId
        ),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }, 
  adminGetAllUsers: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_User_Get_All
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleUser: async (amenityId) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_User_Toggle.replace(":$userId", amenityId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
