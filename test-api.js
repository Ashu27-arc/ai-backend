import axios from "axios";

async function testAPI() {
    console.log("🧪 Testing AI Assistant Backend API\n");

    // Test 1: Chat endpoint
    try {
        console.log("1️⃣ Testing /chat endpoint...");
        const response = await axios.post("http://localhost:5000/chat", {
            message: "Say hello in one word"
        });
        console.log("✅ Chat Success!");
        console.log("   Response:", response.data.reply);
    } catch (error) {
        console.error("❌ Chat Error:", error.message);
    }

    // Test 2: Weather endpoint
    try {
        console.log("\n2️⃣ Testing /weather endpoint...");
        const response = await axios.get("http://localhost:5000/weather?city=london");
        console.log("✅ Weather Success!");
        console.log("   Response:", response.data.weather);
    } catch (error) {
        console.error("❌ Weather Error:", error.message);
    }

    // Test 3: Command detection
    try {
        console.log("\n3️⃣ Testing /cmd endpoint...");
        const response = await axios.post("http://localhost:5000/cmd", {
            message: "what's the weather like"
        });
        console.log("✅ Command Detection Success!");
        console.log("   Detected:", response.data.command);
    } catch (error) {
        console.error("❌ Command Error:", error.message);
    }

    console.log("\n✨ All tests completed!");
}

testAPI();