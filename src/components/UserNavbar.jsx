import React, { useEffect, useState } from "react";
import { Home, User, LogIn, LogOut, Menu } from "lucide-react";
import { SignupModal } from "./SignupModal";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import useApi from "../hooks/useApi";
import userService from "../services/userServices";
import { clearAuth } from "../app/features/users/authSlice";

export default function UserNavbar() {
  const { authState } = useSelector((state) => state?.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    error,
    loading,
    execute: signOutUser,
    success: signOutSuccess,
    reset,
  } = useApi(userService.UserLogout);
  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignIn = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    if (authState?.method === "google-auth") {
      googleLogout();
      console.log("Hello");
    }
    signOutUser();
  };

  useEffect(() => {
    if (signOutSuccess) {
      localStorage.removeItem("user");
      dispatch(clearAuth());
      reset();
    }
  }, [signOutSuccess]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="/"
                className="flex items-center space-x-2 text-rose-500 hover:text-rose-600">
                <Home className="h-8 w-8" />
                <span className="font-bold text-xl hidden sm:block">
                  StayHub
                </span>
              </a>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 rounded-full border border-gray-300 p-2 hover:shadow-md transition-all">
                <Menu className="h-4 w-4" />
                <User className="h-5 w-5 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {authState ? (
                      <>
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem">
                          <User className="h-4 w-4 mr-3" />
                          Profile
                        </a>
                        <button
                          onClick={() => handleLogout()}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem">
                          <LogOut className="h-4 w-4 mr-3" />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleSignIn()}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem">
                        <LogIn className="h-4 w-4 mr-3" />
                        Sign in
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
