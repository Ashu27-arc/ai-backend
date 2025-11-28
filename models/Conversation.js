import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    messages: [{
        role: {
            type: String,
            enum: ["user", "assistant", "system"],
            required: true
        },
        content: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    metadata: {
        platform: String,
        deviceInfo: String
    }
}, {
    timestamps: true
});

export default mongoose.model("Conversation", conversationSchema);