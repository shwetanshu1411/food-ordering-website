// backend/routes/upload.route.js
import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";

dotenv.config(); // <-- load .env

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Generate auth params for frontend
// router.get("/auth", (req, res) => {
//   const authParams = imagekit.getAuthenticationParameters();
//   res.json(authParams);
// });

router.get("/auth", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.json(result);
  } catch (error) {
    console.error("ImageKit Auth Error:", error);
    res.status(500).json({ message: "ImageKit auth failed" });
  }
});

export default router;
