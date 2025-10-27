import React, { useEffect, useState } from "react";
import { getFoodItems } from "../services/api";
import FoodCard from "../components/FoodCard";

export default function Saved({ user }) {
  const [savedFoods, setSavedFoods] = useState([]);

  useEffect(() => {
    getFoodItems().then(res => {
      // Filter only saved foods if backend provides saved info
      setSavedFoods(res.data.FoodItems); 
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Saved Foods</h1>
      {savedFoods.length === 0 ? (
        <p>No saved foods yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedFoods.map(food => <FoodCard key={food._id} food={food} user={user} />)}
        </div>
      )}
    </div>
  );
}
