import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: String, enum: ["user", "bot"], required: true },
      text: { type: String, required: true }
    }
  ],
  summary: { type: String },
}, { timestamps: true });
 
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation; 
