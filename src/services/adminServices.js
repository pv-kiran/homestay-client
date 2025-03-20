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
  adminGetAllCategory: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Category_Get_All,
        JSON.stringify(pagination)
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
  adminGetAllAmenities: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Amenities_Get_All,
        JSON.stringify(pagination)
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
  adminGetAllUsers: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_User_Get_All,
        JSON.stringify(pagination)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleUser: async (userId) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_User_Toggle.replace(":$userId", userId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminHomeStayAdd: async (homestayData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_Homestay,
        homestayData,
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
  adminGetAllHomestays: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_Homestays,
        pagination
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleHomestay: async (homeStayId) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Homestays_Toggle.replace(":$homestayId", homeStayId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminHomestayEdit: async ({ formData, homeStayId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Homestays_Edit.replace(
          ":$homestayId", homeStayId
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
  adminCouponAdd: async (couponData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_Coupon,
        couponData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminCouponEdit: async ({ data, couponId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Coupon_Edit.replace(
          ":$id", couponId
        ),
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminToggleCoupon: async (id) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Coupons_Toggle.replace(":$id", id)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllCoupons: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Coupons_Get_All,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  adminGetAllBookings: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_All_Bookings,
        pagination
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminReorderHomeStayImages: async ({ images, homeStayId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Image_Reordering.replace(":$homeStayId", homeStayId),
        images
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  adminGetMonthlyReports: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Monthly_Report,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetHomestayReports: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Homestay_Wise_Report,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetCategoryReports: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Category_Wise_Report,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetYearlyReports: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Yearly_Report,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetOverallReports: async () => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Overall_Report,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRestaurentAdd: async (homestayData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_Restaurent,
        JSON.stringify(homestayData),
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllRestaurents: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_Restaurent,
        pagination
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRestaurantEdit: async ({ data, restaurentId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_Restaurent.replace(
          ":id", restaurentId
        ),
        {
          ...data,
          city: data?.city?.value
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminHomelyFoodAdd: async (homestayData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_HomelyFood,
        JSON.stringify(homestayData),
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllHomelyFoods: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_HomelyFood,
        pagination
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminHomelyFoodEdit: async ({ data, restaurentId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_HomelyFood.replace(
          ":id", restaurentId
        ),
        {
          ...data,
          city: data?.city?.value
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRoomserviceAdd: async (serviceData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_RoomService,
        serviceData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllRoomservice: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_RoomService,
        JSON.stringify(pagination)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRoomserviceEdit: async ({ formData, serviceId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_RoomService.replace(
          ":id", serviceId
        ),
        formData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRidesAdd: async (serviceData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_Ride,
        serviceData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllRides: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_Ride,
        JSON.stringify(pagination)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRidesEdit: async ({ formData, serviceId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_Ride.replace(
          ":id", serviceId
        ),
        formData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminEntertainmentAdd: async (serviceData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_Entertainment,
        serviceData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllEntertainment: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_Entertainment,
        JSON.stringify(pagination)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminEditEntertainment: async ({ formData, serviceId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_Entertainment.replace(
          ":id", serviceId
        ),
        formData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminOtherServiceAdd: async (serviceData) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Add_OtherService,
        serviceData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllOtherService: async (pagination) => {
    try {
      const response = await axiosInstance.post(
        apiEndpoints.Bestays_Admin_Get_OtherService,
        JSON.stringify(pagination)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminEditOtherService: async ({ formData, serviceId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_OtherService.replace(
          ":id", serviceId
        ),
        formData,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminGetAllAddons: async (city) => {
    try {
      const response = await axiosInstance.get(
        apiEndpoints.Bestays_Admin_Get_ADDONS.replace(":city", city),
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminEditHomeStayAddons: async ({ addOns, homeStayId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Put_HomeStay_OtherService.replace(
          ":id", homeStayId
        ),
        addOns,
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  adminRefundInitiate: async ({ bookingId }) => {
    try {
      const response = await axiosInstance.put(
        apiEndpoints.Bestays_Admin_Booking_Refund.replace(":id", bookingId)
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;
