// const foodModel=require("../models/food.model");
// const storageService=require("../services/storage.services");
// const {v4:uuid}=require("uuid");

// async function createFood(req,res){
//   console.log(req.foodPartner);
//   console.log(req.body);
//   console.log(req.file);

//   const fileUploadResult= await storageService.uploadFile(req.file.buffer,uuid())
//   console.log(fileUploadResult);

//   res.send("food item created");
// }
// module.exports={
//     createFood
// }

import foodModel from "../models/food.model.js";
import { uploadFile } from "../services/storage.services.js";
import { v4 as uuid } from "uuid";

export async function getFoodItems(req,res){
    const FoodItems=await foodModel.find({});
    res.status(200).json({
        message:"Food Items fetched successfully",
        FoodItems
    })
}

export async function createFood(req, res) {
    try {
        // 1️⃣ Check if foodPartner is authenticated
        if (!req.foodPartner) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // 2️⃣ Check if file is provided
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 3️⃣ Upload the file
        const fileUploadResult = await uploadFile(req.file.buffer, uuid());
        console.log("File uploaded:", fileUploadResult); // ✅ optional debug

        // 4️⃣ Create food item in DB
        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url, // <-- lowercase 'url' from ImageKit
            foodPartner: req.foodPartner._id
        });

        // 5️⃣ Respond success
        res.status(201).json({ message: "Food item created", foodItem });

    } catch (error) {
        console.error("Error creating food item:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
