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
import * as storageService from "../services/storage.services.js";
import Like from "../models/likes.model.js";
import Save from "../models/save.model.js";
import { v4 as uuid } from "uuid";

// export async function createFood(req, res) {
//   try {
//     console.log("👉 Incoming food data:", req.body);
//     console.log("📦 Uploaded file:", req.file?.originalname);

//     const { name, price, description, foodPartnerId } = req.body;

//     if (!name || !price || !foodPartnerId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // 🧠 Handle uploaded file (if exists)
//     let imageUrl = "";
//     if (req.file) {
//       // Temporary: store file as Base64 (you can later upload to Cloudinary/S3)
//       imageUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//     }

//     const foodItem = await foodModel.create({
//       name,
//       description: description || "",
//       price,
//       imageUrl,
//       foodPartner: foodPartnerId,
//     });

//     res.status(201).json({
//       message: "✅ Food created successfully",
//       food: foodItem,
//     });
//   } catch (error) {
//     console.error("❌ Create food error:", error);
//     res.status(500).json({
//       message: "Failed to create food",
//       error: error.message,
//     });
//   }
// }


// export async function createFood(req, res) {
//   try {
//     console.log("👉 Incoming food data:", req.body);
//     console.log("📦 Uploaded file:", req.file?.originalname);

//     const { name, price, description, foodPartnerId } = req.body;

//     if (!name || !price || !foodPartnerId) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // 🧠 Handle uploaded file
//     let imageUrl = "";
//     if (req.file) {
//       // Ensure uploads directory exists
//       const uploadDir = path.join("uploads");
//       if (!fs.existsSync(uploadDir)) {
//         fs.mkdirSync(uploadDir, { recursive: true });
//       }

//       // Create a unique filename
//       const fileName = `${Date.now()}_${req.file.originalname}`;
//       const filePath = path.join(uploadDir, fileName);

//       // Save the file locally
//       fs.writeFileSync(filePath, req.file.buffer);

//       // Save the file URL (for frontend access)
//       imageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
//     }

//     // Save food to DB
//     const foodItem = await foodModel.create({
//       name,
//       description: description || "",
//       price,
//       imageUrl,
//       foodPartner: foodPartnerId,
//     });

//     res.status(201).json({
//       message: "✅ Food created successfully",
//       food: foodItem,
//     });
//   } catch (error) {
//     console.error("❌ Create food error:", error);
//     res.status(500).json({
//       message: "Failed to create food",
//       error: error.message,
//     });
//   }
// }


export async function createFood(req, res) {
  try {
    console.log("👉 Incoming food data:", req.body);
    console.log("📦 Uploaded file:", req.file?.originalname);

    const { name, price, description, foodPartnerId, imageUrl } = req.body;

    if (!name || !price || !foodPartnerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let finalImageUrl = imageUrl || "";

    // If file uploaded via multer
    if (req.file) {
      const uploadDir = path.join("uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

      const fileName = `${Date.now()}_${req.file.originalname}`;
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, req.file.buffer);

      finalImageUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
    }

    const foodItem = await foodModel.create({
      name,
      description: description || "",
      price,
      imageUrl: finalImageUrl,
      foodPartner: foodPartnerId,
    });

    res.status(201).json({
      message: "✅ Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("❌ Create food error:", error);
    res.status(500).json({ message: "Failed to create food", error: error.message });
  }
}





export async function getFoodItems(req, res) {
  try {
    console.log("📥 Fetching all food items...");

    const foodItems = await foodModel.find({}).populate("foodPartner", "name");

    console.log("✅ Food items fetched:", foodItems.length);

    res.status(200).json({
      message: "Food items fetched successfully",
      FoodItems: foodItems,
    });
  } catch (error) {
    console.error("❌ Failed to fetch food items:", error);
    res.status(500).json({
      message: "Failed to fetch food items",
      error: error.message,
    });
  }
}



export async function getFoodsByPartner(req, res) {
  try {
    const { partnerId } = req.params;
    const foods = await foodModel.find({ foodPartner: partnerId }).sort({ createdAt: -1 });
    
    res.status(200).json(foods);
  } catch (error) {
    console.error("Get partner foods error:", error);
    res.status(500).json({ 
      message: "Failed to fetch partner foods", 
      error: error.message 
    });
  }
}


export async function deleteFood(req, res) {
  try {
    const { id } = req.params;

    const foodItem = await foodModel.findById(id);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await foodModel.findByIdAndDelete(id);
    res.status(200).json({ message: "✅ Food deleted successfully" });
  } catch (error) {
    console.error("❌ Delete food error:", error);
    res.status(500).json({
      message: "Failed to delete food",
      error: error.message,
    });
  }
}

export async function likeFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await Like.findOne({
      user: user._id,
      food: foodId
    });

    if (isAlreadyLiked) {
      await Like.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: -1 }
      });

      return res.status(200).json({
        message: "Food unliked successfully"
      });
    }

    const like = await Like.create({
      user: user._id,
      food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 }
    });

    res.status(201).json({
      message: "Food liked successfully",
      like
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to like food",
      error: error.message
    });
  }
}

export async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await Save.findOne({
      user: user._id,
      food: foodId
    });

    if (isAlreadySaved) {
      await Save.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: -1 }
      });

      return res.status(200).json({
        message: "Food unsaved successfully"
      });
    }

    const save = await Save.create({
      user: user._id,
      food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: 1 }
    });

    res.status(201).json({
      message: "Food saved successfully",
      save
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save food",
      error: error.message
    });
  }
}

export async function getSaveFood(req, res) {
  try {
    const user = req.user;

    const savedFoods = await Save.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
      message: "Saved foods retrieved successfully",
      savedFoods
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get saved foods",
      error: error.message
    });
  }
}