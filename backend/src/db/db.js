// const mongoose=require("mongoose");
// function connectDB(){
//     mongoose.connect("process.env.MONGO_URI")
//     .then(()=>{
//         console.log("connected to db");
//     })
//     .catch((err)=>{
//         console.log("error connecting to db",err);
//     });
// }
// module.exports=connectDB;

const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, { // no quotes here!
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

module.exports = connectDB;
