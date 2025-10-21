import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50"
      role="navigation"
      aria-label="Bottom"
    >
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-blue-600 transition-colors ${
              isActive ? "text-blue-600" : ""
            }`
          }
        >
          <span aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-medium">Home</span>
        </NavLink>

        {/* Saved */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-blue-600 transition-colors ${
              isActive ? "text-blue-600" : ""
            }`
          }
        >
          <span aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
          </span>
          <span className="text-xs sm:text-sm font-medium">Saved</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;
