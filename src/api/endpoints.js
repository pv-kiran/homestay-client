const apiEndpoints = {
  // user api
  Bestays_User_Signup: "/user/auth/signin",
  Bestays_User_OtpVerify: "/user/auth/otp/verify",
  Bestays_User_GoogleSignIn: "/user/auth/google/signin",
  Bestays_User_AccountSetUp: `user/account/setup/complete/:$userId`,
  Bestays_User_LogOut: "/user/auth/signout",

  // admin api
  Bestays_Admin_Signup: "/admin/auth/signup",
  Bestays_Admin_OtpVerify: "/admin/auth/otp/verify",
  Bestays_Admin_Signin: "/admin/auth/signin",
  Bestays_Admin_LogOut: "/admin/auth/logout",
};

export default apiEndpoints;
