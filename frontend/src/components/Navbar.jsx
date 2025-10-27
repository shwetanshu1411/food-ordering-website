import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, foodPartner, logout }) {
  return (
    <nav className="flex justify-between p-4 bg-orange-500 text-white">
      <Link to="/" className="font-bold text-xl">FoodApp</Link>
      <div className="flex gap-4">
        {!user && !foodPartner && (
          <>
            <Link to="/user/login">User Login</Link>
            <Link to="/user/register">User Register</Link>
            <Link to="/foodpartner/login">Partner Login</Link>
            <Link to="/foodpartner/register">Partner Register</Link>
          </>
        )}
        {user && (
          <>
            <span>{user.fullName}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
        {foodPartner && (
          <>
            <span>{foodPartner.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
