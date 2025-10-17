const express=require("express");
const router=express.Router();
const foodController=require("../controllers/food.controller");
// const authMiddleware=require("../middleware/auth.middleware");
const { authFoodPartnerMiddleware } = require("../middleware/auth.middleware");
const multer=require("multer");

const upload=multer({
    storage:multer.memoryStorage(),

})

/// api/food/     (protected route)
router.post("/",authFoodPartnerMiddleware,upload.single("video"),foodController.createFood);
module.exports=router;