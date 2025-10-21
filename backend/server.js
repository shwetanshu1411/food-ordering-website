// run server
// require("dotenv").config();
// const app=require("./src/app");
// const connectDB=require("./src/db/db");

// connectDB();


// app.listen(3000,()=>{
//     console.log("server is running on port 3000");
// });

import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
