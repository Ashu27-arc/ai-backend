import express from "express";
import {
    sendMail
} from "../services/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {
            to,
            subject,
            text
        } = req.body;

        if (!to || !subject || !text) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const result = await sendMail(to, subject, text);
        return res.json({
            message: result
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Failed to send email"
        });
    }
});

export default router;