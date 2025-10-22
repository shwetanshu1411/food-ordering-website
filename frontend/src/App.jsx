import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FoodPartnerLogin from "./pages/FoodPartnerLogin";
import FoodPartnerRegister from "./pages/FoodPartnerRegister";
import FoodPartnerDashboard from "./pages/FoodPartnerDashboard";
import Saved from "./pages/Saved";

export default function App() {
  const [user, setUser] = useState(null);
  const [foodPartner, setFoodPartner] = useState(null);

  const logout = () => {
    setUser(null);
    setFoodPartner(null);
  };

  return (
    <Router>
      <Navbar user={user} foodPartner={foodPartner} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin setFoodPartner={setFoodPartner} />} />
        <Route path="/foodpartner/register" element={<FoodPartnerRegister setFoodPartner={setFoodPartner} />} />
        <Route path="/dashboard" element={<FoodPartnerDashboard />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </Router>
  );
}
