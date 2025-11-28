import axios from "axios";

export const getWeather = async (city = "indore") => {
    const key = process.env.WEATHER_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    const res = await axios.get(url);
    const w = res.data;

    return `Weather in ${city} is ${w.main.temp}°C, ${w.weather[0].description}`;
};