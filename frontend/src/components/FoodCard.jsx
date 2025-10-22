import React from "react";

export default function FoodCard({ food }) {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <video className="w-full h-48 object-cover rounded" src={food.video} controls />
      <h3 className="font-bold mt-2">{food.name}</h3>
      <p className="text-gray-600">{food.description}</p>
    </div>
  );
}
