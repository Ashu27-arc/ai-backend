import axios from "axios";

export async function textToSpeech(text) {
    try {
        const result = await axios.post(
            "https://api.openai.com/v1/audio/speech", {
                input: text,
                model: "tts-1",
                voice: "alloy"
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                },
                responseType: "arraybuffer"
            }
        );

        return result.data;
    } catch (error) {
        console.error("TTS Error:", error);
        throw new Error("Text to speech conversion failed");
    }
}