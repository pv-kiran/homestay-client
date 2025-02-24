import { replace } from "react-router-dom";
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
  userGetAllCategory: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_All_Categories
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetAllHomestays: async (filterData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_All_Homestays,
        JSON.stringify(filterData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayById: async ({ id, currency }) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Id.replace(":$homestayId", id)?.replace(":$currency", currency)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Profile_View
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayByLocations: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Locations
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userProfileUpdate: async (userData) => {
    const { street, city, district, state, zip, country, gender, phone } = userData
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Profile_Update,
        JSON.stringify({
          address: {
            street,
            city,
            district,
            state,
            zip,
            country,
          },
          gender,
          phone
        })
      )
      return response
    } catch (error) {
      throw error;
    }
  },
  userBookHomestay: async (bookingData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Homestay_Booking,
        JSON.stringify(bookingData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetValidCoupons: async (currency) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Get_Valid_Coupons.replace(":query", `currency=${currency}`)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userApplyCoupon: async (code, id, days, currencyCode, insuranceAmount, addOnAmount) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Apply_Coupon,
        {
          couponCode: code,
          homestayId: id,
          numberOfDays: days,
          currencyCode,
          insuranceAmount,
          addOnAmount: Number(addOnAmount)
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetLatestCoupon: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Latest_Coupon
      )
      return response;
    } catch (error) {
      throw error;
    }
  },
  userBookHomestay: async (bookingData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Homestay_Booking,
        JSON.stringify(bookingData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userBookHomestayComplete: async (bookingData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Homestay_Booking_Complete,
        JSON.stringify(bookingData)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayBookings: async (currency) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Booking_List.replace(":query", `currency=${currency}`)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayCheckIn: async ({ bookingId }) => {
    try {
      const response = await axiosInstance.patch(
        apiEndpoints.Bestays_User_Homestay_CheckIn.replace(":$bookingId", bookingId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayCheckOut: async ({ bookingId }) => {
    try {
      const response = await axiosInstance.patch(
        apiEndpoints.Bestays_User_Homestay_CheckOut.replace(":$bookingId", bookingId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayCancel: async ({ bookingId }) => {
    try {
      const response = await axiosInstance.patch(
        apiEndpoints.Bestays_User_Homestay_Cancel.replace(":$bookingId", bookingId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomeStayBookingStatus: async ({ homeStayId }) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Booking_Status.replace(':$homeStayId', homeStayId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userSubmitReview: async (data) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_User_Homestay_Submit_Review,
        JSON.stringify(data)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userGetHomestayReview: async ({ homeStayId }) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Get_Review.replace(':$homeStayId', homeStayId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  userDownloadReceipt: async (id) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_User_Homestay_Download_Receipt.replace(':$bookingId', id),
        {
          responseType: 'blob',
          headers: {
            'Accept': 'application/pdf'
          }
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
}

export default userService;
