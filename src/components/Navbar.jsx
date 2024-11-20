import { LogOut, Hotel, Menu } from "lucide-react";
import adminService from "./../services/adminServices";
import { clearAuth } from "../app/features/users/authSlice";
import { useDispatch } from "react-redux";
import useApi from "../hooks/useApi";
export default function Navbar({ onMenuClick }) {
  const { execute: adminLogout } = useApi(adminService.adminLogout);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const result = await adminLogout();
    if (result) {
      localStorage.removeItem("user");
      dispatch(clearAuth());
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3 ml-2 lg:ml-0">
              <Hotel color="#14B8A6" className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  BeStays Admin
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Management Dashboard
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleLogout()}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <LogOut className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
