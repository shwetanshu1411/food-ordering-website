import React, { useState } from "react";
import { loginFoodPartner } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerLogin({ setFoodPartner }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginFoodPartner({ email, password });
    setFoodPartner(res.data.foodPartner);
    navigate("/dashboard");
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleLogin}>
      <h1 className="text-2xl mb-4">Partner Login</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 p-2 border" />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2">Login</button>
    </form>
  );
}
