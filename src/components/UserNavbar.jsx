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


export default function UserNavbar() {
  const { authState } = useSelector((state) => state?.userAuth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const {
    execute: signOutUser,
    success: signOutSuccess,
    reset,
  } = useApi(userService.UserLogout);
  const dispatch = useDispatch();
  const location = useLocation();

  const isHomepage = location.pathname === "/";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        console.error('Error fetching currencies:', error);
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
                className="flex items-center space-x-2 text-turquoise-400 hover:text-turquoise-600">
                <Home className="h-8 w-8" />
                <span className="font-bold text-xl hidden sm:block">
                  BeStays
                </span>
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
                      {authState ? (
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
