import mongoose from "mongoose";

const userScheam = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"PLease Provide a username"],
        unique:true 
    },
    email:{
        type:String,
        require:[true,"PLease Provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide a Password"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
    verify:String,
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users||mongoose.model("users",userScheam);
export default User;