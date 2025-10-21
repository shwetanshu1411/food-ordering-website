import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    axios
      .post(
        "http://localhost:3000/api/auth/food-partner/register",
        { name: businessName, contactName, phone, email, password, address },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/create-food");
      })
      .catch((err) => console.error("Error registering!", err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-gray-800"
        role="region"
        aria-labelledby="partner-register-title"
      >
        {/* Header */}
        <header className="mb-4 sm:mb-6">
          <h1
            id="partner-register-title"
            className="text-xl sm:text-2xl font-semibold mb-1"
          >
            Partner sign up
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Grow your business with our platform.
          </p>
        </header>

        {/* Switch links */}
        <nav className="text-sm sm:text-base text-gray-600 mb-4">
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
          {/* Business Name */}
          <div className="flex flex-col">
            <label htmlFor="businessName" className="text-sm sm:text-base font-medium mb-1">
              Business Name
            </label>
            <input
              id="businessName"
              name="businessName"
              placeholder="Tasty Bites"
              autoComplete="organization"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact & Phone - two columns on md+ */}
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="flex-1 flex flex-col">
              <label htmlFor="contactName" className="text-sm sm:text-base font-medium mb-1">
                Contact Name
              </label>
              <input
                id="contactName"
                name="contactName"
                placeholder="Jane Doe"
                autoComplete="name"
                className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 flex flex-col mt-4 md:mt-0">
              <label htmlFor="phone" className="text-sm sm:text-base font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                placeholder="+1 555 123 4567"
                autoComplete="tel"
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
              placeholder="business@example.com"
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
              placeholder="Create password"
              autoComplete="new-password"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm sm:text-base font-medium mb-1">
              Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="123 Market Street"
              autoComplete="street-address"
              className="border border-gray-300 rounded-md px-3 py-2 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Full address helps customers find you faster.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-md font-medium transition duration-200"
          >
            Create Partner Account
          </button>
        </form>

        {/* Sign in link */}
        <div className="text-sm sm:text-base text-gray-600 mt-4">
          Already a partner?{" "}
          <Link
            to="/food-partner/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
