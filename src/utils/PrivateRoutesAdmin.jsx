import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesAdmin = () => {
  const { authState } = useSelector((state) => {
    return state.userAuth;
  });


  return authState?.role === 'admin' ? <Outlet /> : <Navigate to={"/admin/signin"} />;
};

export default PrivateRoutesAdmin;
