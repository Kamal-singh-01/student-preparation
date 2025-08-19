import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [{
        question: String,
        Options: [String],
        correctAnswer: String,
        userAnswer: String 
    }],
    score: Number
},
{timestamps: true});

const Test = mongoose.model("Test", testSchema);
export default Test;