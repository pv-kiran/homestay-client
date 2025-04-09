import React, { useEffect, useState } from "react";
import { Home, User, LogIn, LogOut, Menu, CircleUserRound } from "lucide-react";
import apiEndpoints from "../api/endpoints";
import { SignupModal } from "./SignupModal";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import useApi from "../hooks/useApi";
import userService from "../services/userServices";
import { clearAuth } from "../app/features/users/authSlice";
import { processCurrencyData } from "../utils/currency";
import { CurrencyDropdown } from "./common/CurrencyDropdown";
import MenuItem from "./MenuItem";
import { toast } from "react-toastify";
import logo from '../assets/logo.png'


export default function UserNavbar() {
  const { authState } = useSelector((state) => state?.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    execute: signOutUser,
    success: signOutSuccess,
    reset,
  } = useApi(userService.UserLogout);
  const dispatch = useDispatch();
  const location = useLocation();

  const isHomepage = location.pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const showLogoutMessage = (username = "User") => {
    try {
      toast(
        <div className="flex items-center gap-3 py-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-b from-turquoise-400 to-turquoise-600 rounded-full">
            <LogOut className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-turquoise-700">
              Adios, <span className="font-semibold">{username?.split(" ")[0]}</span>! 👋
            </p>
            <p className="text-sm text-gray-500">See you again soon!</p>
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
      toast.error('Failed to log out. Please try again.', {
        position: "bottom-center",
        className: "!bg-white !rounded-xl !shadow-xl",
      });
    }
  };

  const handleSignIn = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    if (authState?.method === "google-auth") {
      googleLogout();
    }
    signOutUser();
  };

  useEffect(() => {
    if (signOutSuccess) {
      showLogoutMessage(authState?.name);
      localStorage.removeItem("user");
      dispatch(clearAuth());
      reset();
    }
  }, [signOutSuccess]);


  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
  };

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(apiEndpoints.Currency_List);
        const data = await response.json();
        const processedData = processCurrencyData(data);
        setCurrencies(processedData);
      } catch (error) {
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <>
      <nav className={isHomepage ?
        "fixed top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-md bg-opacity-50 bg-gray-600"
        :
        "fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50"
      }>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a
                href="/"
                className="flex items-center space-x-2 text-turquoise-500 hover:text-turquoise-600">
                <img src={"https://res.cloudinary.com/djd2rpgil/image/upload/v1744133672/mvp_bestays/dxbbpgaoy7uztjy3ykxd.png"} alt="" className="h-16 w-32 mr-[-12px]" />
                {/* <span className="font-bold text-xl hidden sm:block mt-2">
                  BeStays
                </span> */}
              </a>
            </div>

            {/* Currency and User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={toggleMenu}
                  className={`flex items-center space-x-2 rounded-full p-2 hover:shadow-md transition-all ${isHomepage ? "" : "border border-gray-300"}`}
                  style={{
                    background: isHomepage ? "#6A6B68" : "transparent",
                  }}>
                  <Menu className={isHomepage ? "h-6 w-6 text-white" : "h-6 w-6"} />
                  <CircleUserRound size={28} color={isHomepage ? "#D3D3D3" : "gray"} />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {authState?.role === 'user' ? (
                        <>
                          <MenuItem setIsMenuOpen={setIsMenuOpen} />
                        </>
                      ) : (
                        <button
                          onClick={handleSignIn}
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
              <CurrencyDropdown
                currencies={currencies}
                onSelect={handleCurrencySelect}
                isHomepage={isHomepage}
              />
            </div>
          </div>
        </div>
      </nav>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
