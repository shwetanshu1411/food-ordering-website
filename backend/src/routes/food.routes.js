import express from "express";
import * as foodController from "../controllers/food.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();

// ✅ Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * POST /api/food
 * Protected route - Only food partners can create food items
 * Body: FormData { name, price, description, foodPartnerId, mama(file) }
 */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("mama"), // ✅ matches frontend formData.append("mama", file)
  foodController.createFood
);

/**
 * GET /api/food - Public
 */
router.get("/", foodController.getFoodItems);

/**
 * POST /api/food/like
 */
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFood);

/**
 * POST /api/food/save
 */
router.post("/save", authMiddleware.authUserMiddleware, foodController.saveFood);

/**
 * GET /api/food/save
 */
router.get("/save", authMiddleware.authUserMiddleware, foodController.getSaveFood);

/**
 * GET /api/food/partner/:partnerId
 */
router.get("/partner/:partnerId", foodController.getFoodsByPartner);

export default router;
