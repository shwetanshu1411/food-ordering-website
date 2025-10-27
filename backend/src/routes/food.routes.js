



import express from "express";
import multer from "multer";
import {
  createFood,
  getFoodItems,
  getFoodsByPartner,
  likeFood,
  saveFood,
  getSaveFood,
    deleteFood,
} from "../controllers/food.controller.js";

import {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Multer configuration (in-memory for now)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Create new food (only for food partners)
// router.post(
//   "/",
//   authFoodPartnerMiddleware,
//   upload.single("image"),
//   createFood
// );

router.post("/create", 
authFoodPartnerMiddleware,
    upload.single("video"), createFood);

// ✅ Get all food items (public)
router.get("/", getFoodItems);

// ✅ Get foods by specific partner
router.get("/partner/:partnerId", getFoodsByPartner);

// ✅ Like a food (only for logged-in users)
router.post("/like", authUserMiddleware, likeFood);

// ✅ Save / Unsave a food (only for logged-in users)
router.post("/save", authUserMiddleware, saveFood);

// ✅ Get all saved foods (only for logged-in users)
router.get("/save", authUserMiddleware, getSaveFood);

router.delete("/:id", deleteFood); 

export default router;
