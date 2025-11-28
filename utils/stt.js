import axios from "axios";
import FormData from "form-data";

export const speechToText = async (audioBuffer) => {
    try {
        const formData = new FormData();
        formData.append("file", audioBuffer, "audio.wav");
        formData.append("model", "whisper-1");

        const result = await axios.post(
            "https://api.openai.com/v1/audio/transcriptions",
            formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        return result.data.text;
    } catch (error) {
        console.error("STT Error:", error);
        throw new Error("Speech to text conversion failed");
    }
};