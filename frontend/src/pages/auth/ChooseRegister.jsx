import React from "react";
import { Link } from "react-router-dom";

const ChooseRegister = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-gray-800"
        role="region"
        aria-labelledby="choose-register-title"
      >
        {/* Header */}
        <header className="mb-6 text-center">
          <h1
            id="choose-register-title"
            className="text-xl sm:text-2xl font-semibold mb-2"
          >
            Register
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Pick how you want to join the platform.
          </p>
        </header>

        {/* Register Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/user/register"
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md font-medium transition duration-200"
          >
            Register as normal user
          </Link>
          <Link
            to="/food-partner/register"
            className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 py-2.5 sm:py-3 rounded-md font-medium transition duration-200"
          >
            Register as food partner
          </Link>
        </div>

        {/* Alt Action */}
        <div className="text-sm sm:text-base text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link className="text-blue-600 hover:text-blue-700 font-medium" to="/user/login">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
