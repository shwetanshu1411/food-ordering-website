// import React, { useEffect, useRef } from "react";
// import { Link } from "react-router-dom";

// const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = "No videos yet." }) => {
//   const videoRefs = useRef(new Map());

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const video = entry.target;
//           if (!(video instanceof HTMLVideoElement)) return;
//           if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
//             video.play().catch(() => {});
//           } else {
//             video.pause();
//           }
//         });
//       },
//       { threshold: [0, 0.25, 0.6, 0.9, 1] }
//     );

//     videoRefs.current.forEach((vid) => observer.observe(vid));
//     return () => observer.disconnect();
//   }, [items]);

//   const setVideoRef = (id) => (el) => {
//     if (!el) {
//       videoRefs.current.delete(id);
//       return;
//     }
//     videoRefs.current.set(id, el);
//   };

//   return (
//     <div className="min-h-screen bg-black text-white overflow-hidden">
//       <div className="flex flex-col items-center space-y-6 px-4 sm:px-6 lg:px-8" role="list">
//         {items.length === 0 && (
//           <div className="flex justify-center items-center h-[80vh]">
//             <p className="text-gray-400 text-sm sm:text-base">{emptyMessage}</p>
//           </div>
//         )}

//         {items.map((item) => (
//           <section
//             key={item._id}
//             className="relative w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-[80vh] sm:h-[85vh] rounded-xl overflow-hidden shadow-lg"
//             role="listitem"
//           >
//             {/* Video */}
//             <video
//               ref={setVideoRef(item._id)}
//               className="w-full h-full object-cover"
//               src={item.video}
//               muted
//               playsInline
//               loop
//               preload="metadata"
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-black/40 to-black p-4">
//               {/* Right-side actions */}
//               <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-5">
//                 {/* Like */}
//                 <div className="flex flex-col items-center space-y-1">
//                   <button
//                     onClick={onLike ? () => onLike(item) : undefined}
//                     aria-label="Like"
//                     className="p-3 sm:p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
//                   >
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="text-white"
//                     >
//                       <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
//                     </svg>
//                   </button>
//                   <div className="text-xs sm:text-sm text-gray-300">
//                     {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
//                   </div>
//                 </div>

//                 {/* Save */}
//                 <div className="flex flex-col items-center space-y-1">
//                   <button
//                     onClick={onSave ? () => onSave(item) : undefined}
//                     aria-label="Bookmark"
//                     className="p-3 sm:p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
//                   >
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="text-white"
//                     >
//                       <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
//                     </svg>
//                   </button>
//                   <div className="text-xs sm:text-sm text-gray-300">
//                     {item.savesCount ?? item.bookmarks ?? item.saves ?? 0}
//                   </div>
//                 </div>

//                 {/* Comments */}
//                 <div className="flex flex-col items-center space-y-1">
//                   <button
//                     aria-label="Comments"
//                     className="p-3 sm:p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
//                   >
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       className="text-white"
//                     >
//                       <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
//                     </svg>
//                   </button>
//                   <div className="text-xs sm:text-sm text-gray-300">
//                     {item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}
//                   </div>
//                 </div>
//               </div>

//               {/* Bottom Description & Button */}
//               <div className="absolute bottom-4 left-4 right-4">
//                 <p
//                   className="text-sm sm:text-base text-gray-100 mb-3 line-clamp-2"
//                   title={item.description}
//                 >
//                   {item.description}
//                 </p>
//                 {item.foodPartner && (
//                   <Link
//                     to={"/food-partner/" + item.foodPartner}
//                     aria-label="Visit store"
//                     className="inline-block bg-blue-600 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:py-2 rounded-full hover:bg-blue-700 transition"
//                   >
//                     Visit store
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </section>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ReelFeed;
