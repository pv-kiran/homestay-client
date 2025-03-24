import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../constants/user';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from "@react-oauth/google";
import userService from '../services/userServices';
import useApi from "../hooks/useApi";
import { LogOut } from "lucide-react";
import { clearAuth } from '../app/features/users/authSlice';
import { toast } from 'react-toastify';
const MenuItem = ({ setIsMenuOpen }) => {
    const { authState } = useSelector((state) => state?.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef();
      const [isLoading, setIsLoading] = useState(false);

    const {
        execute: signOutUser,
        success: signOutSuccess,
        reset,
    } = useApi(userService.UserLogout);

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

    const handleLogout = () => {
        if (authState?.method === "google-auth") {
            googleLogout();
        }
        signOutUser();
    };

    const handleClick = (url) => {
        navigate(url)
        setIsMenuOpen(false)
    };

    useEffect(() => {
        if (signOutSuccess) {
            showLogoutMessage(authState?.name);
            localStorage.removeItem("user");
            dispatch(clearAuth());
            reset();
            navigate('/')
            setIsMenuOpen(false)
        }
    }, [signOutSuccess]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setIsMenuOpen]);


    return (
        <div ref={menuRef}>
            {routes.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(item.path)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                >
                    <span className='pr-4'>
                        {
                            item?.icon
                        }
                    </span>
                    {item.text}
                </button>
            ))}
            <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem">
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
            </button>
        </div>
    );
};

export default MenuItem;
