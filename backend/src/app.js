// // create server

// const express = require("express");
// const cookieParser = require("cookie-parser");
// const authRoutes=require("./routes/auth.route");
// const foodRoutes=require("./routes/food.routes");

// const app=express();
// app.use(cookieParser());
// app.use(express.json());

// app.get("/",(req,res)=>{
//     res.send("hello world");
// });
// app.use("/api/auth",authRoutes);
// app.use("/api/food",foodRoutes);

// module.exports=app;

import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import foodRoutes from "./routes/food.routes.js";

const app = express();

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

export default app;
