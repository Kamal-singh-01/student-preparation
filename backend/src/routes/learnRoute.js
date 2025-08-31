import express from "express";
import User from "../models/userModel.js";
import Conversation from "../models/conversationModel.js";
import { model } from "../config/gemini.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Backend is running!");
});

router.post("/signup", async (req, res) => {
    console.log("Signup route reached.");
    try {
        const { name, email, password } = req.body || {};
        console.log("Received signup data:", { name, email, password });
        if (!name || !email || !password) {
            console.log("Missing signup data.");
            return res.status(400).json({ error: "name, email, password required" });
        }
        console.log("Creating new User instance.");
        const user = new User({ name, email, password });
        console.log("Attempting to save user:", user);
        await user.save();
        console.log(`User signed up successfully: Name - ${user.name}, Email - ${user.email}`);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in signing up user:", error);
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/conversation", async (req, res) => {
    try {
        const userId = req.body.userId || req.body.id;
        const title = req.body.title || "New Conversation";
        if (!userId) return res.status(400).json({ error: "User ID is required" });
        const conv = new Conversation({ user: userId, title, messages: [] });
        await conv.save();
        res.status(201).json(conv);
    } catch (error) {
        console.log("error in creating conversation", error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/history/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: "User ID is required" });
        const conversations = await Conversation.find({ user: userId }).sort({ updatedAt: -1 });
        res.json(conversations);
    } catch (err) {
        console.log("error in getting history", err);
        res.status(500).json({ error: err.message });
    }
});

router.post("/:id/message", async (req, res) => {
    try {
        const { sender, text } = req.body || {};
        const conv = await Conversation.findById(req.params.id);
        if (!conv) return res.status(404).json({ error: "Conversation not found" });
        if (!sender || !text) return res.status(400).json({ error: "sender and text are required" });
        conv.messages.push({ sender, text });
        if (sender === "user") {
            const systemPrompt = `You are StudyAI, a safe and helpful study assistant.
You must ONLY answer study-related queries.
Format:
Overview
- 2–3 sentence overview
Key Points
- bullets
Example
- simplest example
Closing
👉 "Would you like me to elaborate on any point?"
No code fences. Clean text only.`;
            const history = conv.messages.map(m => `${m.sender}: ${m.text}`).join("\n");
            const fullPrompt = `${systemPrompt}\n${history}\nuser: ${text}`;
            const result = await model.generateContent(fullPrompt);
            const botReply = result.response.text();
            conv.messages.push({ sender: "bot", text: botReply });
        }
        await conv.save();
        res.json(conv);
    } catch (error) {
        console.log("error in /:id/message", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/generate", async (req, res) => {
    try {
        const { subject, numQuestions } = req.body || {};
        const prompt = `Create ${numQuestions} multiple-choice questions on ${subject}.
Provide options and correct answer in JSON format. Example:
[{"question":"What is 2+2?","options":["3","4","5","6"],"answer":"4","userAnswer":""}]`;
        const result = await model.generateContent(prompt);
        let text = result.response.text();
        text = text.replace(/```json|```/g, "").trim();
        const questions = JSON.parse(text).map(q => ({ ...q, userAnswer: "" }));
        res.json({ subject, questions });
    } catch (error) {
        console.log("error in generating test", error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/check-answers", (req, res) => {
    try {
        const { questions } = req.body || { questions: [] };
        let score = 0;
        questions.forEach((q) => {
            if (
                q.userAnswer &&
                q.answer &&
                q.userAnswer.trim().toLowerCase() === q.answer.trim().toLowerCase()
            ) score++;
        });
        res.json({ score, total: questions.length });
    } catch (error) {
        console.error("Error in check-answers:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;