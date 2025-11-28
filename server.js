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

// Connect to MongoDB
connectDB(
    () => console.log("MongoDB Connected"),
    () => console.error("MongoDB Connection Error")
);

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/chat", chatRoute);
app.use("/email", emailRoute);
app.use("/weather", weatherRoute);
app.use("/cmd", commandsRoute);
app.use("/ai", aiRoute);

const PORT = 5000;
app.listen(PORT, () => console.log("Backend running on " + PORT));