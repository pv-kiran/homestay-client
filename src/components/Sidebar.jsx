import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { routes } from '../constants/admin';


export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-20 h-full w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full bg-white border-r border-gray-200">
          <div className="flex items-center justify-between p-4 lg:hidden">
            <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="px-4 space-y-2">
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    onClick={() => onClose()}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 gap-3 hover:bg-gray-100 ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:text-gray-900'
                      }`
                    }
                  >
                    {route.icon}
                    <span>{route.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}