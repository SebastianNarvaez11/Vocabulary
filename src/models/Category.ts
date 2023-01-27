import { ICategory } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";


const categorySchema = new Schema({

    name : {type: String, required: [true, 'El nombre es obligatorio']},
    icon : {type: String, required : true},

}, {
    timestamps: true
})


const Category: Model<ICategory> = mongoose.models.Category || model('Category', categorySchema)

export default Category