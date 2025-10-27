// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../services/api";

// export default function Login({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await loginUser({ email, password });
//       console.log("Backend response:", res.data);

//       // Update App state
//       if (setUser) {
//         setUser(res.data.user);
//       }

//       alert(res.data.message || "Logged in successfully!");
//       navigate("/"); // redirect to Home (FoodReel)
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert(err.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
//           User Login
//         </h1>
//         <form onSubmit={handleLogin} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button
//             type="submit"
//             className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-gray-700 mt-4">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-orange-600 font-semibold hover:underline"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

export default function UserLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      if (setUser) setUser(res.data.user);
      alert(res.data.message || "Logged in successfully!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-2">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-500 mb-6">Login to continue</p>

        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-orange-600 font-semibold hover:underline"
          >
            Register here
          </Link>
        </p> */}
      </div>
    </div>
  );
}
