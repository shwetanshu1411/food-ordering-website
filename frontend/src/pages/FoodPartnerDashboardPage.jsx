


// import React, { useEffect, useState } from "react";
// import { getPartnerFoods, createFood } from "../services/api";

// export default function FoodPartnerDashboardPage({ foodPartner }) {
//   const [foods, setFoods] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch foods on mount
//   useEffect(() => {
//     async function fetchFoods() {
//       try {
//         const res = await getPartnerFoods(foodPartner._id);
//         setFoods(res.data);
//       } catch (err) {
//         console.error("Error loading foods:", err);
//       }
//     }
//     if (foodPartner) fetchFoods();
//   }, [foodPartner]);

//   // 🔹 Handle image upload + food creation
//   const handleUpload = async () => {
//     if (!name || !price || !imageFile) {
//       alert("Please fill all fields and choose a file.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // STEP 1️⃣: Get ImageKit auth params from backend
//       const authRes = await fetch("http://localhost:5000/api/upload/auth");
//       const authData = await authRes.json();

//       // STEP 2️⃣: Upload to ImageKit directly from frontend
//       const formData = new FormData();
//       formData.append("file", imageFile);
//       formData.append("fileName", imageFile.name);
//       formData.append("publicKey", "public_3W0X9rBfOh2c0gX1qOCtJymCrS4=");
//       formData.append("signature", authData.signature);
//       formData.append("expire", authData.expire);
//       formData.append("token", authData.token);

//       const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const uploadData = await response.json();

//       if (!uploadData.url) throw new Error("Image upload failed!");

//       // 🔹 Determine whether it’s a video or image file
//       const isVideo = imageFile.type.startsWith("video/");

//       // STEP 3️⃣: Send the food data to backend
//       const foodData = {
//         name,
//         price,
//         imageUrl:  uploadData.url,
//         video: isVideo ? uploadData.url : "",
//         foodPartnerId: foodPartner._id,
//       };

//       await createFood(foodData);

//       // STEP 4️⃣: Reset form and refresh list
//       setName("");
//       setPrice("");
//       setImageFile(null);

//       const res = await getPartnerFoods(foodPartner._id);
//       setFoods(res.data);
//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Image upload failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!foodPartner) return <p>Please login as a food partner.</p>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">{foodPartner.name} Dashboard</h1>

//       {/* 🔹 Upload form */}
//       <div className="my-4 flex gap-2 flex-wrap">
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="Food Name"
//           className="border p-2"
//         />
//         <input
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Price"
//           className="border p-2"
//         />
//         <input
//           type="file"
//           accept="image/*,video/*"
//           onChange={(e) => setImageFile(e.target.files[0])}
//           className="border p-2"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="bg-orange-500 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Uploading..." : "Upload Food"}
//         </button>
//       </div>

//       {/* 🔹 Food List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {foods.map((food) => (
//           <div key={food._id} className="border p-2 rounded shadow">
//             {/* Show image or video */}
//             {food.imageUrl ? (
//               <img
//                 src={food.imageUrl}
//                 alt={food.name}
//                 className="w-full h-32 object-cover mb-2 rounded"
//               />
//             ) : food.video ? (
//               <video
//                 src={food.video}
//                 controls
//                 className="w-full h-32 object-cover mb-2 rounded"
//               />
//             ) : (
//               <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
//                 <span className="text-gray-500 text-sm">No media</span>
//               </div>
//             )}

//             <p className="font-semibold">{food.name}</p>
//             <p>₹{food.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { getPartnerFoods, createFood, deleteFood } from "../services/api";

export default function FoodPartnerDashboardPage({ foodPartner }) {
  const [foods, setFoods] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // 🆕 Added description
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch foods on mount
  async function fetchFoods() {
    try {
      const res = await getPartnerFoods(foodPartner._id);
      setFoods(res.data);
    } catch (err) {
      console.error("Error loading foods:", err);
    }
  }

  useEffect(() => {
    if (foodPartner) fetchFoods();
  }, [foodPartner]);

  // 🔹 Handle image upload + food creation
  const handleUpload = async () => {
    if (!name || !price || !imageFile) {
      alert("Please fill all fields and choose a file.");
      return;
    }

    setLoading(true);
    try {
      // STEP 1️⃣: Get ImageKit auth params from backend
      const authRes = await fetch("http://localhost:5000/api/upload/auth");
      const authData = await authRes.json();

      // STEP 2️⃣: Upload to ImageKit directly from frontend
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

      // 🔹 Determine whether it’s a video or image file
      const isVideo = imageFile.type.startsWith("video/");

      // STEP 3️⃣: Send the food data to backend
      const foodData = {
        name,
        price,
        description, // 🆕 Include description
        imageUrl: uploadData.url,
        video: isVideo ? uploadData.url : "",
        foodPartnerId: foodPartner._id,
      };

      await createFood(foodData);

      // STEP 4️⃣: Reset form and refresh list
      setName("");
      setPrice("");
      setDescription(""); // 🆕 Reset
      setImageFile(null);
      await fetchFoods();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Image upload failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Delete Food
  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      await deleteFood(id);
      alert("✅ Food deleted successfully!");
      await fetchFoods();
    } catch (error) {
      console.error("❌ Delete failed:", error);
      alert("Failed to delete food item!");
    }
  };

  if (!foodPartner) return <p>Please login as a food partner.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{foodPartner.name} Dashboard</h1>

      {/* 🔹 Upload form */}
      <div className="my-4 flex gap-2 flex-wrap">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Food Name"
          className="border p-2 w-full sm:w-auto"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="border p-2 w-full sm:w-auto"
        />

        {/* 🆕 Description input */}
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="border p-2 w-full sm:w-auto"
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="border p-2 w-full sm:w-auto"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload Food"}
        </button>
      </div>

      {/* 🔹 Food List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="border p-2 rounded shadow">
            {/* Show image or video */}
            {food.imageUrl ? (
              <img
                src={food.imageUrl}
                alt={food.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
            ) : food.video ? (
              <video
                src={food.video}
                controls
                className="w-full h-32 object-cover mb-2 rounded"
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
                <span className="text-gray-500 text-sm">No media</span>
              </div>
            )}

            <p className="font-semibold">{food.name}</p>
            <p className="text-sm text-gray-600">{food.description || "No description"}</p>
            <p>₹{food.price}</p>

            {/* 🗑 Delete Button */}
            <button
              onClick={() => handleDelete(food._id, food.name)}
              className="bg-red-500 text-white mt-2 px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
