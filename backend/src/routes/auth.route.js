// const express= require("express");
// const authController=require("../controllers/auth.controller");

// const router=express.Router();

// //user auth apis
// router.post("/user/register",authController.registerUser);
// router.post("/user/login",authController.loginUser);
// router.get("/user/logout",authController.logoutUser);

// //food partner auth apis
// router.post("/foodpartner/register",authController.registerfoodPartner);
// router.post("/foodpartner/login",authController.loginfoodPartner);
// router.get("/foodpartner/logout",authController.logoutfoodPartner);
// module.exports=router;

import express from "express";
import multer from "multer";
import {
  registerUser,
  loginUser,
  logoutUser,
  registerfoodPartner,
  loginfoodPartner,
  logoutfoodPartner
} from "../controllers/auth.controller.js";

const router = express.Router();
const upload = multer(); // for parsing multipart/form-data text fields

// User auth APIs (JSON only)
router.post("/user/register", express.json(), registerUser);
router.post("/user/login", express.json(), loginUser);
router.get("/user/logout", logoutUser);

// Food partner auth APIs — handle form-data text fields
router.post("/foodpartner/register", upload.none(), registerfoodPartner);
router.post("/foodpartner/login", upload.none(), loginfoodPartner);
router.get("/foodpartner/logout", logoutfoodPartner);

export default router;
