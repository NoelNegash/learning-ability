import mongoose, { Schema, Document } from 'mongoose';

export const CardSchema = new Schema({
    image: { type: String, required: true },
    term: { type: String, required: true },
    description: { type: String, required: true }
});

const Card = mongoose.model('Card', CardSchema);

export default Card;