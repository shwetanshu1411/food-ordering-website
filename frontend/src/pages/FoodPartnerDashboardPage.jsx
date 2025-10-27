import React, { useEffect, useState } from "react";
import { getPartnerFoods, createFood } from "../services/api";

export default function FoodPartnerDashboardPage({ foodPartner }) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFoods() {
      try {
        const res = await getPartnerFoods(foodPartner._id);
        setFoods(res.data);
      } catch (err) {
        console.error("Error loading foods:", err);
      }
    }
    if (foodPartner) fetchFoods();
  }, [foodPartner]);

const handleUpload = async () => {
  if (!name || !price || !imageFile) {
    alert("Please fill all fields and choose a file.");
    return;
  }

  setLoading(true);
  try {
    // Step 1: Get auth params from backend
    const authRes = await fetch("http://localhost:5000/api/upload/auth");
    const authData = await authRes.json();

    // Step 2: Upload to ImageKit directly
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("fileName", imageFile.name);
    formData.append("publicKey", "public_3W0X9rBfOh2c0gX1qOCtJymCrS4=");
    formData.append("signature", authData.signature);
    formData.append("expire", authData.expire);
    formData.append("token", authData.token);

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await response.json();
    if (!uploadData.url) throw new Error("Image upload failed!");

    // Step 3: Create food in backend
    const foodData = {
      name,
      price,
      imageUrl: uploadData.url,
      foodPartnerId: foodPartner._id,
    };

    await createFood(foodData);

    // Reset form
    setName("");
    setPrice("");
    setImageFile(null);

    // Refresh food list
    const res = await getPartnerFoods(foodPartner._id);
    setFoods(res.data);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Image upload failed!");
  } finally {
    setLoading(false);
  }
};


  if (!foodPartner) return <p>Please login as a food partner.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{foodPartner.name} Dashboard</h1>

      <div className="my-4 flex gap-2 flex-wrap">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food Name"
          className="border p-2"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2"
        />
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2"
        />
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload Food"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="border p-2 rounded shadow">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <p className="font-semibold">{food.name}</p>
            <p>₹{food.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
