const apiEndpoints = {
  // user api
  Bestays_User_Signup: "/user/auth/signin",
  Bestays_User_OtpVerify: "/user/auth/otp/verify",
  Bestays_User_OtpResend: "/user/auth/otp/resend",
  Bestays_User_GoogleSignIn: "/user/auth/google/signin",
  Bestays_User_AccountSetUp: `user/account/setup/complete/:$userId`,
  Bestays_User_LogOut: "/user/auth/signout",

  // admin api
  Bestays_Admin_Signup: "/admin/auth/signup",
  Bestays_Admin_OtpVerify: "/admin/auth/otp/verify",
  Bestays_Admin_Signin: "/admin/auth/signin",
  Bestays_Admin_LogOut: "/admin/auth/logout",
  Bestays_Admin_Otp_Resend: "/admin/auth/otp/resend",
  Bestays_Admin_Category_Add: "/admin/add-category",
  Bestays_Admin_Category_Get_All: "/admin/get-allcategories",
  Bestays_Admin_Category_Toggle: "admin/toggle-category/:$categoryId",
  Bestays_Admin_Category_Edit: "admin/edit-category/:$categoryId",
  Bestays_Admin_Amenities_Add: "/admin/add-amenities",
  Bestays_Admin_Amenities_Get_All: "/admin/get-allamenities",
  Bestays_Admin_Amenities_Toggle: "/admin/toggle-amenity/:$amenityId",
  Bestays_Admin_Amenities_Edit: "/admin/edit-amenity/:$amenityId",
  Bestays_Admin_User_Get_All: "/admin/get-allusers",
  Bestays_Admin_User_Toggle: "/admin/toggle-user/:$userId",
  Bestays_Admin_Add_Homestay: "/admin/add-homestay",
  Bestays_Admin_Get_Homestays: "/admin/get-allhomestays",
  Bestays_Admin_Homestays_Toggle: "/admin/toggle-homestay/:$homestayId"
};

export default apiEndpoints;
