import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../constants/user';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogout } from "@react-oauth/google";
import userService from '../services/userServices';
import useApi from "../hooks/useApi";
import { LogOut } from "lucide-react";
import { clearAuth } from '../app/features/users/authSlice';
const MenuItem = ({ setIsMenuOpen }) => {
    const { authState } = useSelector((state) => state?.userAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuRef = useRef();

    const {
        execute: signOutUser,
        success: signOutSuccess,
        reset,
    } = useApi(userService.UserLogout);

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
