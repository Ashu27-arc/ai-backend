import express from "express";
import {
    askAI
} from "../services/openai.js";
import {
    detectCommand
} from "../services/commandEngine.js";
import {
    getWeather
} from "../services/weather.js";
import {
    setTimer
} from "../services/timer.js";
import {
    sendMail
} from "../services/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            message,
            conversationHistory = []
        } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                error: "Invalid message format"
            });
        }

        // 1. Detect command
        const cmd = detectCommand(message);

        if (cmd) {
            if (cmd.type === "weather") {
                const weatherInfo = await getWeather("indore");
                const reply = await askAI(`User asked about weather. The weather data is: ${weatherInfo}. Respond naturally and conversationally.`, conversationHistory);
                return res.json({
                    reply
                });
            }

            if (cmd.type === "timer") {
                setTimer(cmd.minutes);
                const reply = await askAI(`User asked to set a timer for ${cmd.minutes} minutes. Confirm it naturally and friendly.`, conversationHistory);
                return res.json({
                    reply
                });
            }

            if (cmd.type === "email") {
                const r = await sendMail("to@gmail.com", "AI Mail", "Hello!");
                const reply = await askAI(`User asked to send an email. Result: ${r}. Respond naturally.`, conversationHistory);
                return res.json({
                    reply
                });
            }

            if (cmd.type === "open") {
                const reply = await askAI(`User asked to open ${cmd.target}. Confirm you're opening it in a friendly way.`, conversationHistory);
                return res.json({
                    reply,
                    action: `open:${cmd.target}`,
                });
            }
        }

        // No command → normal AI chat with conversation history
        const reply = await askAI(message, conversationHistory);
        return res.json({
            reply
        });
    } catch (error) {
        console.error("Chat route error:", error);
        return res.status(500).json({
            error: "Failed to process message",
            message: error.message
        });
    }
});

export default router;