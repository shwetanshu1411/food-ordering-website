import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UserRegister({ setUser }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser({ fullName, email, password });
      setUser(res.data.user);
      navigate("/"); // Redirect to home after registration
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleRegister}>
      <h1 className="text-2xl mb-4">User Register</h1>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Full Name"
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
