import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ add this

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import FoodPartnerDashboardPage from "./pages/FoodPartnerDashboardPage";
import OrderPage from "./pages/OrderPage";

export default function App() {
  const [user, setUser] = useState(null);
  const [foodPartner, setFoodPartner] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setFoodPartner(null);
  };

  useEffect(() => {
    // TODO: check session/cookies if needed
  }, []);

  return (
    <>
      {/* ✅ Navbar visible on all pages */}
      <Navbar user={user} foodPartner={foodPartner} logout={handleLogout} />

      <Routes>
        {/* Home page – visible to everyone */}
        <Route
          path="/"
          element={<Home user={user} foodPartner={foodPartner} />}
        />

        {/* User login/register */}
        <Route
          path="/user/login"
          element={user ? <Navigate to="/" /> : <UserLogin setUser={setUser} />}
        />
        <Route
          path="/user/register"
          element={
            user ? <Navigate to="/" /> : <UserRegister setUser={setUser} />
          }
        />

        {/* Food Partner login/register */}
        <Route
          path="/foodpartner/login"
          element={
            foodPartner ? (
              <Navigate to="/dashboard" />
            ) : (
              <FoodPartnerLogin setFoodPartner={setFoodPartner} />
            )
          }
        />
        <Route
          path="/foodpartner/register"
          element={
            foodPartner ? (
              <Navigate to="/dashboard" />
            ) : (
              <FoodPartnerRegister setFoodPartner={setFoodPartner} />
            )
          }
        />

        {/* Partner Dashboard */}
        <Route
          path="/dashboard"
          element={
            foodPartner ? (
              <FoodPartnerDashboardPage foodPartner={foodPartner} />
            ) : (
              <Navigate to="/foodpartner/login" />
            )
          }
        />

        {/* Orders – only users can order */}
        <Route
          path="/order/:foodId"
          element={user ? <OrderPage user={user} /> : <Navigate to="/user/login" />}
        />
      </Routes>
    </>
  );
}
