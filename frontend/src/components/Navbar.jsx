import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, foodPartner, logout }) {
  return (
    <nav className="flex justify-between p-4 bg-orange-500 text-white">
      <Link to="/" className="font-bold text-xl">Foodies</Link>
      <div className="space-x-4">
        {user && <span>Hello, {user.fullName}</span>}
        {foodPartner && <span>Hello, {foodPartner.name}</span>}
        {user && <button onClick={logout}>Logout</button>}
        {foodPartner && <button onClick={logout}>Logout</button>}
        {!user && !foodPartner && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/foodpartner/login">Food Partner Login</Link>
            <Link to="/foodpartner/register">Food Partner Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
