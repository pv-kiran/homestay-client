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
import PublicRoutesAdmin from "./utils/PublicRoutesAdmin";
import PrivateRoutesAdmin from "./utils/PrivateRoutesAdmin";
import AmenitiesPage from "./pages/AmenitiesPage";
import UserManagementPage from "./pages/UserManagmentPage";
import HomeStayPage from "./pages/HomeStayPage";
import AllHomeStaysPage from "./pages/AllHomeStaysPage";
import NotFound404 from "./pages/NotFound404";
import UserProfilePage from "./pages/UserProfilePage";
import CouponsPage from "./pages/CouponsPage";
import MyBookings from "./pages/MyBookings";
import BookingsPage from "./pages/BookingsPage";
import BookingSuccess from "./pages/BookingSuccess";


function AppRoutes() {
  return (
    <Routes>
      {/* User layout and its nested routes */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/homestays/all" element={<AllHomeStaysPage />} />
        <Route path="/homestay/view/:id" element={<HomeStayPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/booking/:id/success" element={<BookingSuccess />} />
      </Route>

      <Route element={<PublicRoutesAdmin />}>
        <Route path="/admin/signup" element={<AdminSignupPage />} />
        <Route path="/admin/signin" element={<AdminSigninPage />} />
      </Route>

      {/* Admin layout and its nested routes */}
      <Route element={<PrivateRoutesAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="amenities" element={<AmenitiesPage />} />
          <Route path="coupons" element={<CouponsPage />} />
          <Route path="add-ons" element={<AddOnsPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="sample" element={<SamplePage />} />
        </Route>
      </Route>

      {/*404 page*/}
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
}

export default AppRoutes;
