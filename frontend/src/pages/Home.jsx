import React, { useEffect, useState } from "react";
import { getFoodItems } from "../services/api";
import FoodCard from "../components/FoodCard";

export default function Home({ user }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function fetchFoods() {
      const res = await getFoodItems();
      setFoods(res.data.FoodItems);
    }
    fetchFoods();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {foods.map(food => (
        <FoodCard key={food._id} food={food} user={user} />
      ))}
    </div>
  );
}
