




// import React from "react";

// export default function FoodCard({ food}) {
//   return (
//     <div className="border rounded-lg p-3 shadow-md hover:shadow-lg transition bg-white">
//       {food.imageUrl ? (
//         // <img
//         //   src={food.imageUrl}
//         //   alt={food.name}
//         //   className="w-full h-48 object-cover rounded-md mb-2"
//         // />
//         <img
//   src={food.imageUrl || food.video || "https://via.placeholder.com/150"}
//   alt={food.name}
//   className="w-full h-32 object-cover mb-2 rounded"
// />

//       ) : (
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-2">
//           <span className="text-gray-500">No image</span>
//         </div>
//       )}

//       <h2 className="text-lg font-semibold">{food.name}</h2>
//       <p className="text-gray-600 text-sm">{food.description || "No description"}</p>
//       <p className="text-orange-600 font-bold mt-1">₹{food.price}</p>

//       {food.foodPartner?.name && (
//         <p className="text-xs text-gray-500 mt-1">
//           Partner: {food.foodPartner.name}
//         </p>
//       )}
//     </div>
//   );
// }


import React from "react";

export default function FoodCard({ food }) {
  const mediaUrl =
    food.imageUrl && food.imageUrl.trim() !== ""
      ? food.imageUrl
      : food.video && food.video.trim() !== ""
      ? food.video
      : null;

  const isVideo = mediaUrl?.includes(".mp4") || food.video;

  return (
    <div className="border rounded-lg p-3 shadow-md hover:shadow-lg transition bg-white">
      {mediaUrl ? (
        isVideo ? (
          <video
            src={mediaUrl}
            controls
            className="w-full h-48 object-cover rounded-md mb-2"
          />
        ) : (
          <img
            src={mediaUrl}
            alt={food.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
        )
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-2">
          <span className="text-gray-500">No media</span>
        </div>
      )}

      <h2 className="text-lg font-semibold">{food.name}</h2>
      <p className="text-gray-600 text-sm">
        {food.description || "No description"}
      </p>
      {food.price && (
        <p className="text-orange-600 font-bold mt-1">₹{food.price}</p>
      )}
      {food.foodPartner?.name && (
        <p className="text-xs text-gray-500 mt-1">
          Partner: {food.foodPartner.name}
        </p>
      )}
    </div>
  );
}
