import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodItems } from "../services/api";

export default function OrderPage({ user }) {
  const { foodId } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    async function fetchFood() {
      const res = await getFoodItems();
      const selectedFood = res.data.FoodItems.find(f => f._id === foodId);
      setFood(selectedFood);
    }
    fetchFood();
  }, [foodId]);

  if (!user) return <p>Please login to order.</p>;
  if (!food) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{food.name}</h1>
      <video src={food.video} controls className="w-full h-64 my-2" />
      <p>{food.description}</p>
      <p>Price: ₹{food.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-2">Order Now</button>
    </div>
  );
}
