// const mongoose=require("mongoose");
// const foodSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     video:{
//         type:String,
//         required:true,
//     },
//     description:{
//         type: String
//     },
//     foodPartner:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"foodpartner"
//     }
// });

// const foodModel=mongoose.model("food",foodSchema);
// module.exports=foodModel;

import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: String, required: true },
    imageUrl: { type: String, required: false }, // ✅ image instead of video
    foodPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodPartner",
      required: true,
    },
    likeCount: { type: Number, default: 0 },
    savesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const foodModel = mongoose.model("Food", foodSchema);
export default foodModel;
