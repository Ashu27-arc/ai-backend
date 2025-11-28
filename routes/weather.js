import express from "express";
import {
    getWeather
} from "../services/weather.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const city = req.query.city || "indore";
        const weather = await getWeather(city);
        return res.json({
            weather
        });
    } catch (error) {
        console.error("Weather API Error:", error.message);

        if (error.response ?.status === 401) {
            return res.status(500).json({
                error: "Invalid Weather API key. Get one from https://openweathermap.org/api"
            });
        }

        return res.status(500).json({
            error: "Failed to fetch weather",
            message: error.message
        });
    }
});

export default router;