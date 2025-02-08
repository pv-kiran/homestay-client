import { NavLink } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { routes } from '../constants/admin';
import { useState } from 'react';

export default function Sidebar({ isOpen, onClose }) {
  const [expandedMenus, setExpandedMenus] = useState([]);

  const toggleSubmenu = (title) => {
    setExpandedMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const renderMenuItem = (route) => {
    const isExpanded = expandedMenus.includes(route.title);

    if (route.hasSubMenu) {
      return (
        <li key={route.title}>
          <button
            onClick={() => toggleSubmenu(route.title)}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
          >
            <div className="flex items-center gap-3">
              {route.icon}
              <span>{route.title}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
          </button>
          {isExpanded && (
            <div className="relative">
              <ul className="ml-9 mt-1 space-y-1 max-h-[160px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent pr-2">
                {route.subMenu.map((subItem) => (
                  <li key={subItem.path}>
                    <NavLink
                      to={subItem.path}
                      onClick={() => onClose()}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-200 hover:bg-gray-100 ${isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'hover:text-gray-900'
                        }`
                      }
                    >
                      {subItem.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {route.subMenu.length > 4 && (
                <div className="absolute bottom-0 left-0 right-2 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none ml-9" />
              )}
            </div>
          )}
        </li>
      );
    }

    return (
      <li key={route.path}>
        <NavLink
          to={route.path}
          onClick={() => onClose()}
          className={({ isActive }) =>
            `flex items-center px-4 py-3 text-gray-700 rounded-lg transition-colors duration-200 gap-3 hover:bg-gray-100 ${isActive
              ? 'bg-blue-50 text-blue-600 font-medium'
              : 'hover:text-gray-900'
            }`
          }
        >
          {route.icon}
          <span>{route.title}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-20 h-full w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
              {routes.map(route => renderMenuItem(route))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}