import { IWord } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";


const WordSchema = new Schema({

    english: { type: String, required: [true, 'El significado en ingles es obligatorio'] },
    spanish: { type: String, required: [true, 'El significado en español es obligatorio'] },
    image: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }

}, {
    timestamps: true
})


const Word: Model<IWord> = mongoose.models.Word || model('Word', WordSchema)

export default Word