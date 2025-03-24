import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userServices";
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/features/users/authSlice";
import { Sparkles } from "lucide-react";
import { toast } from "react-toastify";

const GoogleLogin = ({ handleSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data,
    error,
    loading,
    execute: handleGoogleSignin,
    success,
    reset,
  } = useApi(userService.UserGoogleSignup);

  const showWelcomeToast = async (username = "User") => {
    try {      
      toast(
        <div className="flex items-center gap-3 py-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-turquoise-400 to-turquoise-600 rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-turquoise-700">
              Welcome, <span className="font-semibold">{username?.split(" ")[0]}</span>! ✨
            </p>
            <p className="text-sm text-gray-500">We're glad to see you.</p>
          </div>
        </div>,
        {
          position: "bottom-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: "!bg-white !rounded-xl !shadow-xl !px-4",
          bodyClassName: "!p-0",
          progressClassName: "!bg-gradient-to-r !from-turquoise-400 !to-turquoise-600"
        }
      );
    } catch (error) {
      toast.error('Failed to load user data. Please try again.', {
        position: "bottom-center",
        className: "!bg-white !rounded-xl !shadow-xl",
      });
    }
  };

  useEffect(() => {
    if (success) {
      localStorage.setItem("user", JSON.stringify(data?.userDetails));
      dispatch(setAuth());
      handleSuccess(data?.userDetails);
      showWelcomeToast(data?.userDetails?.name);
    }
  }, [success]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      handleGoogleSignin(tokenResponse);
    },
    onError: (error) => {
      // TODO : Handle google login error handle
      console.error("Login Failed:", error);
    },
  });

  return (
    <button
      onClick={() => {
        login();
      }}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-white text-black-500 px-6 py-2  w-full rounded-lg border border-black-400 hover:bg-gray-50 transition-colors disabled:opacity-50 mt-4">
      <svg className="w-10 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285f4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34a853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#fbbc05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#ea4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      {loading ? "Signing in..." : "Sign in with Google"}
    </button>
  );
};

export default GoogleLogin;
