// const userModel=require("../models/user.model");
// const foodPartnerModel=require("../models/foodpartner.model");
// const bcrypt=require("bcryptjs");
// const jwt=require("jsonwebtoken");

// async function registerUser(req,res){
//     const {fullName,email,password}=req.body;

//     const isUserAlreadyRegistered=await userModel.findOne({email:email});

//     if(isUserAlreadyRegistered){
//         return res.status(400).json({message:"user already registered"});
//     }

//     const hashedPassword=await bcrypt.hash(password,10);

//     const user=await userModel.create({
//         fullName,email,password:hashedPassword
//     })

//     const token=jwt.sign({
//         id:user._id,
//     },process.env.JWT_SECRET)

//     res.cookie("token",token)
//     res.status(201).json({message:"user registered successfully",
//         user:{
//             _id:user._id,
//             email:user.email,
//             fullName:user.fullName
//         }
//     });
// }

// async function loginUser(req,res){
//     const {email,password}=req.body;
//     const user=await userModel.findOne({
//         email:email
//     })
//     if(!user){
//         return res.status(400).json({message:"user not found"});
//     }

//     const isPasswordValid=await bcrypt.compare(password,user.password);
//     if(!isPasswordValid){
//         return res.status(400).json({message:"invalid credentials"});
//     }
//     const token =jwt.sign({
//         id:user._id,
//     },process.env.JWT_SECRET)
//     res.cookie("token",token)
//     res.status(200).json({
//         message:"user logged in successfully",
//         user:{
//             _id:user._id,
//             email:user.email,
//             fullName:user.fullName
//         }
//     })
// }

// function logoutUser(req,res){
//     res.clearCookie("token");
//     res.status(200).json({message:"user logged out successfully"});
// }


// async function registerfoodPartner(req,res){
//     const {name,email,password}=req.body;

//     const isAccountAlreadyExist=await foodPartnerModel.findOne({email:email});
//     if(isAccountAlreadyExist){
//         return res.status(400).json({message:"account already exist"});
//     }
//     const hashedPassword=await bcrypt.hash(password,10);

//     const foodPartner=await foodPartnerModel.create({
//         name,email,password:hashedPassword
//     })
//     const token=jwt.sign({
//         id:foodPartner._id,
//     },process.env.JWT_SECRET)
//     res.cookie("token",token)
//     res.status(201).json({message:"food partner registered successfully",
//         foodPartner:{
//             _id:foodPartner._id,
//             email:foodPartner.email,
//             name:foodPartner.name
//         }
//     })
// }

//     async function loginfoodPartner(req,res){
//         const {email,password}=req.body;
//         const foodPartner=await foodPartnerModel.findOne({
//             email:email
//         })  
//         if(!foodPartner){
//             return res.status(400).json({message:"food partner not found"});
//         }
//         const isPasswordValid=await bcrypt.compare(password,foodPartner.password);
//         if(!isPasswordValid){
//             return res.status(400).json({message:"invalid credentials"});
//         }
//         const token =jwt.sign({
//             id:foodPartner._id,
//         },process.env.JWT_SECRET)
//         res.cookie("token",token)
//         res.status(200).json({
//             message:"food partner logged in successfully",
//             foodPartner:{
//                 _id:foodPartner._id,
//                 email:foodPartner.email,
//                 name:foodPartner.name
//             }
//         })
//     }

//     function logoutfoodPartner(req,res){
//         res.clearCookie("token");
//         res.status(200).json({message:"food partner logged out successfully"});
//     }
// module.exports={
//     registerUser,
//     loginUser,
//     logoutUser,
//     registerfoodPartner,
//     loginfoodPartner,
//     logoutfoodPartner
// }


import userModel from "../models/user.model.js";
import foodPartnerModel from "../models/foodpartner.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyRegistered = await userModel.findOne({ email: email });

    if (isUserAlreadyRegistered) {
        return res.status(400).json({ message: "user already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName, email, password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(201).json({
        message: "user registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        message: "user logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    });
}

export function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "user logged out successfully" });
}

export async function registerfoodPartner(req, res) {
    const { name, email, password , phone, address, contactName} = req.body;

    const isAccountAlreadyExist = await foodPartnerModel.findOne({ email: email });
    if (isAccountAlreadyExist) {
        return res.status(400).json({ message: "account already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name, email, password: hashedPassword ,phone , address, contactName
    });

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
        message: "food partner registered successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}

export async function loginfoodPartner(req, res) {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email: email });
    if (!foodPartner) {
        return res.status(400).json({ message: "food partner not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(200).json({
        message: "food partner logged in successfully",
        foodPartner: {
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    });
}

export function logoutfoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "food partner logged out successfully" });
}
