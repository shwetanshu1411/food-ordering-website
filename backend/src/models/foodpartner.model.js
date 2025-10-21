// const mongoose=require('mongoose');

// const foodPartnerSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// });

// const foodPartnerModel=mongoose.model('foodpartner',foodPartnerSchema);

// module.exports=foodPartnerModel;\


import mongoose from 'mongoose';

const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ContactName:{
        type: String,
        required: true,
    },
    Phone:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const foodPartnerModel = mongoose.model('foodpartner', foodPartnerSchema);
export default foodPartnerModel;
