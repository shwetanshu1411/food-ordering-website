// const foodPartnerModel=require("../models/foodpartner.model");
// const jwt=require("jsonwebtoken");

// async function authFoodPartnerMiddleware(req,res,next){
//     const token=req.cookies.token;
//     if(!token){
//         return res.status(401).json({message:"unauthorized"});
//     }
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET);
//         const foodPartner=await foodPartnerModel.findById(decoded.id);
//         req.foodPartner=foodPartner;
//         next();
//     }catch(err){
//         return res.status(401).json({message:"invalid token"});
//     }
// }

// module.exports={
//     authFoodPartnerMiddleware
// }

import foodPartnerModel from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";

export async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        req.foodPartner = foodPartner;
        next();
    } catch (err) {
        return res.status(401).json({ message: "invalid token" });
    }
}
