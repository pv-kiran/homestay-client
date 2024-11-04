import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AccountPage from "./pages/AccountPage";
import DashboardPage from "./pages/DashboardPage";
import RoomsPage from "./pages/RoomsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AddOnsPage from "./pages/AddOnsPage";
import SamplePage from "./pages/SamplePage";
import LandingPage from "./pages/LandingPage";
import UserLayout from "./layout/UserLayout";
import { AdminSignupPage } from "./pages/AdminSignupPage";
import AdminSigninPage from "./pages/AdminSigninPage";

function AppRoutes() {
  return (
    <Routes>
      {/* User layout and its nested routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route path="/admin/signup" element={<AdminSignupPage />} />
      <Route path="/admin/signin" element={<AdminSigninPage />} />

      {/* Admin layout and its nested routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="add-ons" element={<AddOnsPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="sample" element={<SamplePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
