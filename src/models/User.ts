import { IUser } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";


const userSchema = new Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
}, {
    timestamps: true
})


const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User