import { IWord } from "@/interfaces";
import mongoose, { Schema, model, Model } from "mongoose";


const WordSchema = new Schema({

    english: { type: String, required: [true, 'El significado en ingles es obligatorio'] },
    spanish: { type: String, required: [true, 'El significado en español es obligatorio'] },
    image: { type: String, default: '' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    points: { type: Number, default: 3 },
    current_review: { type: Number },
    next_review: { type: Number }

}, {
    timestamps: true
})


const Word: Model<IWord> = mongoose.models.Word || model('Word', WordSchema)

export default Word