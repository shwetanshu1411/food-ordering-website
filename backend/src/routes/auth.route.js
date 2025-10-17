const express= require("express");
const authController=require("../controllers/auth.controller");

const router=express.Router();

//user auth apis
router.post("/user/register",authController.registerUser);
router.post("/user/login",authController.loginUser);
router.get("/user/logout",authController.logoutUser);

//food partner auth apis
router.post("/foodpartner/register",authController.registerfoodPartner);
router.post("/foodpartner/login",authController.loginfoodPartner);
router.get("/foodpartner/logout",authController.logoutfoodPartner);
module.exports=router;