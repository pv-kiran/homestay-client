import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicRoutesAdmin() {
  const { authState } = useSelector((state) => {
    return state?.userAuth;
  });

  return authState?.role === "admin" ? <Navigate to="/admin" /> : <Outlet />;
}

export default PublicRoutesAdmin;
