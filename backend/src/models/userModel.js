import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
});

// ⚠️ No pre-save hashing, password stored as-is

// Optional: simple password check method
userSchema.methods.matchPassword = function(enteredPassword) {
    return enteredPassword === this.password;
};

const User = mongoose.model("User", userSchema);
export default User;
