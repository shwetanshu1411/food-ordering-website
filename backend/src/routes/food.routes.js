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
// routes/food.routes.js

import express from "express";
import multer from "multer";

import foodController from "../controllers/food.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Multer setup (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
});

/* POST /api/food/ [protected] */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("mama"),
  foodController.createFood
);

/* GET /api/food/ [protected] */
router.get(
  "/",
  authMiddleware.authUserMiddleware,
  foodController.getFoodItems
);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.getSaveFood
);

export default router;
