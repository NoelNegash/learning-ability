import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';


export const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    accountExpires: {
        type: Date,
        default: () => {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 1);
            return expirationDate;
        },
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', UserSchema);

export default User