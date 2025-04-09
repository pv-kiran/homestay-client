import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesUser = () => {
    const { authState } = useSelector((state) => {
        return state?.userAuth;
    });


    return authState?.role === "user" ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutesUser;
