import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";

const iconMap = {
  edit: Pencil,
  delete: Trash2,
  view: Eye
};

const defaultClassNames = {
  edit: "text-blue-600 hover:text-blue-800",
  toggle: "text-gray-600 hover:text-gray-800",
  delete: "text-red-600 hover:text-red-800",
};

const ToggleSwitch = ({ isActive, onClick, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none">
      <div
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
          ${!isActive ? "bg-turquoise-300" : "bg-gray-300"}
        `}>
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm
            ${!isActive ? "translate-x-6" : "translate-x-1"}
          `}
        />
      </div>
    </button>
  );
};

export const TableActions = ({ actions }) => {
  return (
    <div className="flex items-center space-x-4">
      {actions.map((action, index) => {
        if (action.icon === "toggle") {
          return (
            <ToggleSwitch
              key={index}
              isActive={action.isActive}
              onClick={action.onClick}
              title={action.title}
            />
          );
        }

        const Icon = iconMap[action.icon];
        return (
          <button
            key={index}
            onClick={action.onClick}
            className={`transition-colors duration-200 ${
              action.className || defaultClassNames[action.icon]
            }`}
            title={action.title}>
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
};
