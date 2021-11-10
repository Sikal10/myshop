import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your email"],
        validate: [validator.isEmail, "Please enter a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Your password should be more than 6 characters"],
        select: false
    },
    role: {
        type: String,
        default: "user"
    }
}, {timestamps: true});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;