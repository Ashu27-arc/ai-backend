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
    const {
        message
    } = req.body;

    // 1. Detect command
    const cmd = detectCommand(message);

    if (cmd) {
        if (cmd.type === "weather") {
            return res.json({
                reply: await getWeather("indore")
            });
        }

        if (cmd.type === "timer") {
            return res.json({
                reply: setTimer(cmd.minutes)
            });
        }

        if (cmd.type === "email") {
            const r = await sendMail("to@gmail.com", "AI Mail", "Hello!");
            return res.json({
                reply: r
            });
        }

        if (cmd.type === "open") {
            return res.json({
                reply: `Opening ${cmd.target}...`,
                action: `open:${cmd.target}`,
            });
        }
    }

    // No command → normal AI chat
    const reply = await askAI(message);
    return res.json({
        reply
    });
});

export default router;