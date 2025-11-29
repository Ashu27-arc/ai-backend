export const detectCommand = (text) => {
    text = text.toLowerCase();

    // Open commands - more natural variations
    if (text.match(/\b(open|launch|start|show|go to)\s+(youtube|yt)\b/) ||
        (text.includes("youtube") && !text.includes("how") && !text.includes("what"))) {
        return {
            type: "open",
            target: "youtube"
        };
    }
    if (text.match(/\b(open|launch|start|show|go to)\s+google\b/) ||
        text.includes("google.com")) {
        return {
            type: "open",
            target: "google"
        };
    }
    if (text.match(/\b(open|launch|start|show|go to)\s+(facebook|fb)\b/)) {
        return {
            type: "open",
            target: "facebook"
        };
    }
    if (text.match(/\b(open|launch|start|show|go to)\s+(twitter|x\.com)\b/)) {
        return {
            type: "open",
            target: "twitter"
        };
    }
    if (text.match(/\b(open|launch|start|show|go to)\s+(instagram|insta|ig)\b/)) {
        return {
            type: "open",
            target: "instagram"
        };
    }

    // Weather commands - more natural variations
    if (text.match(/\b(weather|temperature|temp|forecast|climate)\b/) ||
        text.includes("how's the weather") ||
        text.includes("what's the weather")) {
        return {
            type: "weather"
        };
    }

    // Email commands
    if (text.match(/\b(send|write|compose)\s+(email|mail|message)\b/)) {
        return {
            type: "email"
        };
    }

    // Timer commands
    if (text.match(/\b(set|start|create)\s+(a\s+)?(timer|alarm)\b/) ||
        text.includes("remind me in")) {
        return {
            type: "timer",
            minutes: extractMinutes(text)
        };
    }

    // Reminder commands
    if (text.match(/\b(remind|reminder)\s+me\b/)) {
        return {
            type: "reminder"
        };
    }

    // Music commands
    if (text.match(/\b(play|start)\s+(music|song|audio)\b/)) {
        return {
            type: "music"
        };
    }

    return null;
};

const extractMinutes = (text) => {
    const match = text.match(/(\d+)\s*minutes/);
    return match ? parseInt(match[1]) : 1;
};