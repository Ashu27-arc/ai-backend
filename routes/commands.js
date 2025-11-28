import express from "express";
import {
    detectCommand
} from "../services/commandEngine.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {
        message
    } = req.body;

    const command = detectCommand(message);

    if (command) {
        return res.json({
            command
        });
    }

    return res.json({
        command: null,
        message: "No command detected"
    });
});

export default router;