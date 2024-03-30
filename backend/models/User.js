import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
    },
    profile: {
        type: String,
        default: "null.jpg"
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.matchPasswords = async function (enteredPassword) {
    console.log('user hashed password',enteredPassword)
    console.log('user hashed password in db',this.password)
    return await bcrypt.compare(enteredPassword, this.password)
}

const Users = mongoose.model('Users', userSchema);

export default Users;
