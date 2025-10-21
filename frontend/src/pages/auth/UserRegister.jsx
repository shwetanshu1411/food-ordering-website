import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post(
      "http://localhost:3000/api/auth/user/register",
      { fullName: firstName + " " + lastName, email, password },
      { withCredentials: true }
    );

    console.log(response.data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-gray-800"
        role="region"
        aria-labelledby="user-register-title"
      >
        {/* Header */}
        <header className="mb-4 sm:mb-6 text-center">
          <h1
            id="user-register-title"
            className="text-xl sm:text-2xl font-semibold mb-1"
          >
            Create your account
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Join to explore and enjoy delicious meals.
          </p>
        </header>

        {/* Switch */}
        <nav className="text-sm sm:text-base text-gray-600 mb-4 text-center">
          <strong className="font-semibold">Switch:</strong>{" "}
          <Link to="/user/register" className="text-blue-600 hover:text-blue-700">
            User
          </Link>{" "}
          •{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-600 hover:text-blue-700"
          >
            Food partner
          </Link>
        </nav>

        {/* Form */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          {/* First & Last Name - Two columns on md+ */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex-1 flex flex-col">
              <label htmlFor="firstName" className="text-sm sm:text-base font-medium mb-1">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="Jane"
                autoComplete="given-name"
                className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 flex flex-col mt-4 md:mt-0">
              <label htmlFor="lastName" className="text-sm sm:text-base font-medium mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                autoComplete="family-name"
                className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

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
              autoComplete="new-password"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md font-medium transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Alt Action */}
        <div className="text-sm sm:text-base text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/user/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
