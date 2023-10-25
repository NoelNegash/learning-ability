import mongoose, { Schema } from 'mongoose';


const DrillSchema = new Schema({
    userID: { type: String, required: true },
    deckID: { type: String, required: true },
    accuracy: { type: Number, default: 0, required: true },
    speed: { type: Number, default: 0, required: true },
    createdAt: { type: Date, default: Date.now },
});

DrillSchema.set('autoCreate', true);

const Drill = mongoose.model('Drill', DrillSchema);

export default Drill;
