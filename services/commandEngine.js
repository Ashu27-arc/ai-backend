export const detectCommand = (text) => {
    text = text.toLowerCase();

    // Open commands
    if (text.includes("open youtube") || text.includes("youtube")) return {
        type: "open",
        target: "youtube"
    };
    if (text.includes("open google") || text.includes("google.com")) return {
        type: "open",
        target: "google"
    };
    if (text.includes("open facebook") || text.includes("facebook")) return {
        type: "open",
        target: "facebook"
    };
    if (text.includes("open twitter") || text.includes("twitter")) return {
        type: "open",
        target: "twitter"
    };
    if (text.includes("open instagram") || text.includes("instagram")) return {
        type: "open",
        target: "instagram"
    };

    // Other commands
    if (text.includes("weather")) return {
        type: "weather"
    };
    if (text.includes("email")) return {
        type: "email"
    };
    if (text.includes("timer")) return {
        type: "timer",
        minutes: extractMinutes(text)
    };
    if (text.includes("remind me")) return {
        type: "reminder"
    };
    if (text.includes("play music")) return {
        type: "music"
    };

    return null;
};

const extractMinutes = (text) => {
    const match = text.match(/(\d+)\s*minutes/);
    return match ? parseInt(match[1]) : 1;
};