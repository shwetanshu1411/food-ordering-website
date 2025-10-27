import express from "express";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js"; // ✅ Correct import

const router = express.Router();

// ✅ GET /api/food-partner/:id
router.get("/food-partner/:id", getFoodPartnerById);

export default router;
