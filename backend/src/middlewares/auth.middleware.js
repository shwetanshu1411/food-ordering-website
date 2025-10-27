
// import jwt from "jsonwebtoken";
// import foodPartnerModel from "../models/foodpartner.model.js";
// import userModel from "../models/user.model.js";

// export async function authFoodPartnerMiddleware(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Please login first" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const foodPartner = await foodPartnerModel.findById(decoded.id);
//     req.foodPartner = foodPartner;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

// export async function authUserMiddleware(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({ message: "Please login first" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await userModel.findById(decoded.id);
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// }

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";

// ✅ Middleware for normal user authentication
export async function authUserMiddleware(req, res, next) {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ authUserMiddleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}

// ✅ Middleware for food partner authentication
export async function authFoodPartnerMiddleware(req, res, next) {
  try {
    const token =
      req.cookies.token ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await foodPartnerModel.findById(decoded.id);

    if (!partner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    req.foodPartner = partner;
    next();
  } catch (err) {
    console.error("❌ authFoodPartnerMiddleware error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
}


