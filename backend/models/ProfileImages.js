import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const profileImageSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:'users',
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const profileImage = mongoose.model('userProfiles',profileImageSchema)

export default profileImage