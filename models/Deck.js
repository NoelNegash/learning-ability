import mongoose, { Schema, Document } from 'mongoose';
import { CardSchema } from './Card.js';


const DeckSchema = new Schema({
    userID: { type: String, required: true },
    name: { type: String, required: true },
    cards: { type: [CardSchema], required: true },
    increment: { type: Number, default: 1, required: true },
    images: { type: Boolean, default: false, required: true },
    public: { type: Boolean, default: false, required: true },
    createdAt: { type: Date, default: Date.now },
});

DeckSchema.set('autoCreate', true);

const Deck = mongoose.model('Deck', DeckSchema);

export default Deck;
