const apiEndpoints = {
  Bestays_User_Signup: "/user/auth/signin",
  Bestays_User_OtpVerify: "/user/auth/otp/verify",
  Bestays_User_GoogleSignIn: "/user/auth/google/signin",
  Bestays_User_AccountSetUp: `user/account/setup/complete/:$userId`,
  Bestays_User_LogOut: "/user/auth/signout",
};

export default apiEndpoints;
