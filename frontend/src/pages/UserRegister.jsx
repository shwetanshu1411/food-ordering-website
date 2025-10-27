// import React, { useState } from "react";
// import { registerUser } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function UserRegister({ setUser }) {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await registerUser({ fullName, email, password });
//       setUser(res.data.user);
//       navigate("/"); // Redirect to home after registration
//     } catch (err) {
//       alert(err.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <form className="max-w-md mx-auto p-4" onSubmit={handleRegister}>
//       <h1 className="text-2xl mb-4">User Register</h1>
//       <input
//         type="text"
//         value={fullName}
//         onChange={(e) => setFullName(e.target.value)}
//         placeholder="Full Name"
//         className="w-full mb-2 p-2 border"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="w-full mb-2 p-2 border"
//         required
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="w-full mb-2 p-2 border"
//         required
//       />
//       <button type="submit" className="bg-orange-500 text-white px-4 py-2">
//         Register
//       </button>
//     </form>
//   );
// }


import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function UserRegister({ setUser }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ fullName, email, password });
      setUser(res.data.user);
      alert(res.data.message || "Registered successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Create Account ✨
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join us and start ordering now
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md transition-all font-semibold shadow-md"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p> */}
      </div>
    </div>
  );
}
