import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import chatRoute from "./routes/chat.js";
import emailRoute from "./routes/email.js";
import weatherRoute from "./routes/weather.js";
import commandsRoute from "./routes/commands.js";
import aiRoute from "./routes/ai.js";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// routes
app.use("/chat", chatRoute);
app.use("/email", emailRoute);
app.use("/weather", weatherRoute);
app.use("/cmd", commandsRoute);
app.use("/ai", aiRoute);

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        status: "running",
        message: "AI Assistant Backend is running! 🚀",
        endpoints: {
            chat: "/chat",
            weather: "/weather",
            email: "/email",
            commands: "/cmd",
            ai: "/ai"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 AI Assistant Backend running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
    console.log(`\nEndpoints:`);
    console.log(`  - POST /chat - Main chat endpoint`);
    console.log(`  - GET  /weather - Weather information`);
    console.log(`  - POST /email - Send emails`);
    console.log(`  - POST /cmd - Command detection`);
    console.log(`  - POST /ai/similarity - Text similarity`);
    console.log(`  - POST /ai/embeddings - Text embeddings\n`);
});