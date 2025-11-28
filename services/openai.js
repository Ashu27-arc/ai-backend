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
    const openai = getClient();

    // Use appropriate model based on provider
    const model = process.env.OPENAI_API_KEY.startsWith("gsk_") ?
        "llama-3.3-70b-versatile" // Groq model
        :
        "gpt-4o-mini"; // OpenAI model

    // System prompt for conversational AI
    const systemPrompt = {
        role: "system",
        content: `You are a friendly and helpful AI assistant. You have a warm, conversational personality and enjoy chatting with users. 

Key traits:
- Be conversational and natural, like talking to a friend
- Show personality and humor when appropriate
- Be helpful and informative
- Keep responses concise but engaging (2-3 sentences usually)
- Use emojis occasionally to be friendly 😊
- Remember context from the conversation
- If asked to open websites or perform actions, acknowledge it naturally

Examples:
User: "Hello"
You: "Hey there! 👋 How's it going? What can I help you with today?"

User: "Tell me a joke"
You: "Sure! Why don't scientists trust atoms? Because they make up everything! 😄 Want to hear another one?"

User: "Open YouTube"
You: "Opening YouTube for you! 🎥 Enjoy watching!"

Be yourself and have fun chatting!`
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
        temperature: 0.8, // More creative and conversational
        max_tokens: 500,
    });

    return res.choices[0].message.content;
};