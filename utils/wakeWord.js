import {
    Porcupine
} from "@picovoice/porcupine-node";

let porcupine;

export const initWakeWord = async () => {
    try {
        const accessKey = process.env.PICOVOICE_KEY;

        if (!accessKey) {
            console.warn("⚠️ PICOVOICE_KEY not set. Wake word detection disabled.");
            return;
        }

        porcupine = await Porcupine.create(accessKey, [{
                builtin: "hey google",
                sensitivity: 0.7
            },
            {
                builtin: "alexa",
                sensitivity: 0.7
            },
            {
                builtin: "computer",
                sensitivity: 0.7
            },
        ]);

        console.log("✅ Wake word engine loaded.");
    } catch (error) {
        console.error("❌ Wake word initialization failed:", error.message);
        console.log("Wake word detection will be disabled.");
    }
};

export const detectWakeWord = async (audioFrame) => {
    if (!porcupine) {
        return false;
    }

    try {
        const keywordIndex = porcupine.process(audioFrame);

        if (keywordIndex >= 0) {
            console.log("🎤 Wake Word Detected!");
            return true;
        }
        return false;
    } catch (error) {
        console.error("Wake word detection error:", error.message);
        return false;
    }
};