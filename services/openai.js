import OpenAI from "openai";

let client = null;

const getClient = () => {
    if (!client) {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            throw new Error("OPENAI_API_KEY is not set in environment variables");
        }

        // Check if it's a Groq API key (starts with gsk_)
        if (apiKey.startsWith("gsk_")) {
            client = new OpenAI({
                apiKey: apiKey,
                baseURL: "https://api.groq.com/openai/v1"
            });
        } else {
            // Regular OpenAI key
            client = new OpenAI({
                apiKey: apiKey
            });
        }
    }
    return client;
};

export const askAI = async (prompt, conversationHistory = []) => {
    try {
        const openai = getClient();

        // Use appropriate model based on provider
        const apiKey = process.env.OPENAI_API_KEY || '';
        const model = apiKey.startsWith("gsk_") ?
            "llama-3.3-70b-versatile" // Groq model
            :
            "gpt-4o-mini"; // OpenAI model

        // System prompt for conversational AI
        const systemPrompt = {
            role: "system",
            content: `You are a friendly and helpful AI assistant with a warm, conversational personality. You chat naturally like a friend while being helpful and informative.

Key traits:
- Be conversational and natural, like talking to a friend
- Show personality and humor when appropriate
- Remember context from previous messages in the conversation
- Keep responses concise but engaging (2-4 sentences usually)
- Use emojis occasionally to be friendly 😊
- Be empathetic and understanding
- If asked to open websites or perform actions, acknowledge it naturally
- Ask follow-up questions when appropriate to keep the conversation flowing
- Adapt your tone to match the user's mood and style

Examples:
User: "Hello"
You: "Hey there! 👋 How's it going? What can I help you with today?"

User: "Tell me a joke"
You: "Sure! Why don't scientists trust atoms? Because they make up everything! 😄 Want to hear another one?"

User: "Open YouTube"
You: "Opening YouTube for you! 🎥 Enjoy watching!"

User: "I'm feeling bored"
You: "Aw, I get that! 😊 Want me to tell you an interesting fact, a joke, or maybe open something fun like YouTube? What sounds good?"

User: "What's the weather?"
You: "Let me check that for you! [After getting weather data] It's looking nice today! Anything else you'd like to know?"

Be yourself, remember the conversation context, and have fun chatting!`
        };

        // Build messages array with system prompt and conversation history
        const messages = [systemPrompt];

        // Add conversation history if provided
        if (conversationHistory && conversationHistory.length > 0) {
            messages.push(...conversationHistory);
        }

        // Add current user message
        messages.push({
            role: "user",
            content: prompt
        });

        const res = await openai.chat.completions.create({
            model: model,
            messages: messages,
            temperature: 0.9, // More creative and conversational
            max_tokens: 600,
            top_p: 0.95,
            frequency_penalty: 0.3, // Reduce repetition
            presence_penalty: 0.3, // Encourage diverse responses
        });

        const content = res.choices && res.choices[0] && res.choices[0].message && res.choices[0].message.content;
        return content || "Sorry, I couldn't generate a response.";
    } catch (error) {
        console.error("OpenAI API error:", error);
        throw new Error(`AI service error: ${error.message}`);
    }
};