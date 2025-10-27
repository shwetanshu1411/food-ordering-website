import React, { useState } from "react";
import { registerFoodPartner } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerRegister({ setFoodPartner }) {
  const [name, setName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("contactName", contactName);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("email", email);
      formData.append("password", password);

      const res = await registerFoodPartner(formData);
      setFoodPartner(res.data.foodPartner);
      navigate("/dashboard"); // Redirect to dashboard after registration
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleRegister}>
      <h1 className="text-2xl mb-4">Food Partner Register</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Restaurant Name"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="text"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        placeholder="Contact Name"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-2 p-2 border"
        required
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
