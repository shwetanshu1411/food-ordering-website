import React, { useEffect, useState } from "react";
import { getFoodItems } from "../services/api";
import FoodCard from "./FoodCard";

export default function FoodReel() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoodItems().then(res => setFoods(res.data.FoodItems));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {foods.map(food => <FoodCard key={food._id} food={food} />)}
    </div>
  );
}
