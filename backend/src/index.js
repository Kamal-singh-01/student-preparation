import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/learnRoute.js';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
} else {
    app.use(cors({
        origin: process.env.FRONTEND_URL, // Replace with your Netlify frontend URL
    }));
}

app.use(express.json());
app.use("/", router);

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Failed to connect to DB:", err);
    });