import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/login",
      { email, password },
      { withCredentials: true }
    );

    console.log(response.data);
    navigate("/"); // Redirect to home after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-gray-800"
        role="region"
        aria-labelledby="user-login-title"
      >
        {/* Header */}
        <header className="mb-4 sm:mb-6 text-center">
          <h1
            id="user-login-title"
            className="text-xl sm:text-2xl font-semibold mb-1"
          >
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Sign in to continue your food journey.
          </p>
        </header>

        {/* Form */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm sm:text-base font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm sm:text-base font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md font-medium transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Alt Action */}
        <div className="text-sm sm:text-base text-gray-600 mt-4 text-center">
          New here?{" "}
          <a href="/user/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
