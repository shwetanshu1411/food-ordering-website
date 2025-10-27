import React, { useEffect, useState } from "react";
import { getFoodItems } from "../services/api";

export default function FoodReel({ user }) {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await getFoodItems();
        setFoodItems(res.data.FoodItems || []);
      } catch (err) {
        console.error("Error fetching food items:", err);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {foodItems.length === 0 ? (
        <p>No food items available</p>
      ) : (
        foodItems.map((food) => (
          <div key={food._id} className="border p-4 rounded-md">
            <h3 className="font-bold">{food.name}</h3>
            <p>{food.description}</p>
            <video src={food.video} controls className="w-full mt-2 rounded-md" />
            {user && <p>Welcome {user.fullName}, you can like/save this!</p>}
          </div>
        ))
      )}
    </div>
  );
}
