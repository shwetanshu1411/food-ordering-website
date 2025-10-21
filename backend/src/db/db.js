

// const mongoose = require("mongoose");

// function connectDB() {
//     mongoose.connect(process.env.MONGO_URI, { // no quotes here!
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log("✅ Connected to MongoDB Atlas");
//     })
//     .catch((err) => {
//         console.error("❌ Error connecting to db:", err);
//     });
// }

// module.exports = connectDB;


import mongoose from "mongoose";

export default function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ Connected to MongoDB Atlas");
    })
    .catch((err) => {
        console.error("❌ Error connecting to db:", err);
    });
}
