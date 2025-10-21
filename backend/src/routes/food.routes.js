// // const express=require("express");
// // const router=express.Router();
// // const foodController=require("../controllers/food.controller");
// // // const authMiddleware=require("../middleware/auth.middleware");
// // const { authFoodPartnerMiddleware } = require("../middleware/auth.middleware");
// // const multer=require("multer");

// // const upload=multer({
// //     storage:multer.memoryStorage(),

// // })

// // /// api/food/     (protected route)
// // router.post("/",authFoodPartnerMiddleware,upload.single("video"),foodController.createFood);
// // module.exports=router;


// import express from "express";
// import { createFood } from "../controllers/food.controller.js";
// import { authFoodPartnerMiddleware } from "../middleware/auth.middleware.js";
// import multer from "multer";

// const router = express.Router();

// const upload = multer({
//     storage: multer.memoryStorage(),
// });

// // /api/food/ (protected route)
// router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

// export default router;
import express from "express";
import multer from "multer";
import { createFood, getFoodItems } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer(); // in-memory storage

// POST route — add new food item
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

// GET route — fetch all food items
router.get("/", authFoodPartnerMiddleware, getFoodItems);

export default router;
