import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setVideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Section */}
      <section className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between max-w-5xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-md mt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8">
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500"
            src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D"
            alt="Profile"
          />

          <div className="text-center sm:text-left">
            <h1
              className="text-xl sm:text-2xl font-bold text-gray-800 truncate"
              title={profile?.name}
            >
              {profile?.name}
            </h1>
            <p
              className="text-gray-500 text-sm sm:text-base truncate max-w-xs"
              title={profile?.address}
            >
              {profile?.address}
            </p>
          </div>
        </div>

        <div
          className="flex justify-center sm:justify-end gap-6 mt-6 sm:mt-0"
          role="list"
          aria-label="Stats"
        >
          <div className="text-center" role="listitem">
            <span className="block text-xs uppercase text-gray-500">Total Meals</span>
            <span className="text-lg font-semibold text-blue-600">
              {profile?.totalMeals}
            </span>
          </div>
          <div className="text-center" role="listitem">
            <span className="block text-xs uppercase text-gray-500">Customers Served</span>
            <span className="text-lg font-semibold text-blue-600">
              {profile?.customersServed}
            </span>
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-300 max-w-5xl mx-auto" />

      {/* Video Grid */}
      <section
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 max-w-5xl mx-auto px-4 sm:px-8 pb-8"
        aria-label="Videos"
      >
        {videos.map((v) => (
          <div
            key={v.id}
            className="relative overflow-hidden rounded-xl bg-black shadow-md aspect-[9/16] hover:scale-[1.02] transition-transform"
          >
            <video
              className="w-full h-full object-cover"
              src={v.video}
              muted
              playsInline
              loop
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default Profile;
