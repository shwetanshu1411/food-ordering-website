import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, foodPartner, logout }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [partnerMenuOpen, setPartnerMenuOpen] = useState(false);

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
    setPartnerMenuOpen(false);
  };

  const handlePartnerMenuToggle = () => {
    setPartnerMenuOpen(!partnerMenuOpen);
    setUserMenuOpen(false);
  };

  // ✅ After login/signup, show minimal navbar
  if (user || foodPartner) {
    const name = user?.name || foodPartner?.name;
    return (
      <nav className="flex justify-between items-center bg-orange-500 text-white px-6 py-3 shadow-md">
        <Link to="/" className="font-bold text-xl">
          FoodApp
        </Link>

        <div className="flex items-center gap-4">
          <span className="font-medium">Hello, {name}</span>
          <button
            onClick={logout}
            className="bg-white text-orange-600 px-4 py-1 rounded-md font-semibold hover:bg-orange-100 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }

  // ✅ Before login/signup
  return (
    <nav className="flex justify-between items-center bg-orange-500 text-white px-6 py-3 shadow-md relative">
      {/* Left - Logo */}
      <Link to="/" className="font-bold text-xl tracking-wide">
        FoodApp
      </Link>

      {/* Right - Dropdown Menus */}
      <div className="flex items-center gap-6">
        {/* User Menu */}
        <div className="relative">
          <button
            onClick={handleUserMenuToggle}
            className="font-medium hover:text-yellow-200 transition"
          >
            User
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-20">
              <Link
                to="/user/login"
                className="block px-4 py-2 hover:bg-orange-100 transition"
                onClick={() => setUserMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/user/register"
                className="block px-4 py-2 hover:bg-orange-100 transition"
                onClick={() => setUserMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Food Partner Menu */}
        <div className="relative">
          <button
            onClick={handlePartnerMenuToggle}
            className="font-medium hover:text-yellow-200 transition"
          >
            Food Partner
          </button>
          {partnerMenuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-lg shadow-lg z-20">
              <Link
                to="/foodpartner/login"
                className="block px-4 py-2 hover:bg-orange-100 transition"
                onClick={() => setPartnerMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/foodpartner/register"
                className="block px-4 py-2 hover:bg-orange-100 transition"
                onClick={() => setPartnerMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
