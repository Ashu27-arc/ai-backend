# 🚀 AI Backend Server

Backend server for AI Assistant with ChatGPT-style chat, TensorFlow text analysis, voice commands, and system controls.

## 📦 Installation

```bash
npm install
```

## ⚙️ Configuration

The `.env` file is already configured with:

```env
OPENAI_API_KEY=gsk_... (Groq AI - Free & Fast)
WEATHER_KEY=... (OpenWeatherMap)
EMAIL_ID=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PICOVOICE_KEY=... (Wake word detection)
MONGODB_URI=mongodb://localhost:27017/ai-assistant
```

## 🚀 Start Server

```bash
npm start
# or
node server.js
```

Server runs on `http://0.0.0.0:5000` (accessible from all network interfaces)

✅ Wait for: **"Model loaded successfully!"** (15-20 seconds on first run)

## 📡 API Endpoints

### 🤖 AI Chat (ChatGPT Style)
```bash
POST /chat
Content-Type: application/json

{
  "message": "What's the weather like?"
}

Response:
{
  "reply": "Let me check the weather for you..."
}
```

### 📊 Text Similarity (TensorFlow)
```bash
POST /ai/similarity
Content-Type: application/json

{
  "text1": "I love programming",
  "text2": "I enjoy coding"
}

Response:
{
  "text1": "I love programming",
  "text2": "I enjoy coding",
  "similarity": "0.7387",
  "percentage": "73.87%"
}
```

### 🧠 Text Embeddings
```bash
POST /ai/embeddings
Content-Type: application/json

{
  "texts": ["Hello", "World", "AI"]
}

Response:
{
  "count": 3,
  "embeddings": [[...512 dimensions...], [...], [...]]
}
```

### 🌤️ Weather
```bash
GET /weather?city=London

Response:
{
  "city": "London",
  "temperature": "15°C",
  "description": "Cloudy"
}
```

### 📧 Email
```bash
POST /email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Hello",
  "body": "Test email"
}
```

### 🎯 Command Detection
```bash
POST /cmd
Content-Type: application/json

{
  "text": "What's the weather in London?"
}

Response:
{
  "type": "weather",
  "city": "London"
}
```

## 🧠 TensorFlow.js Integration

### Universal Sentence Encoder

The backend uses **Universal Sentence Encoder** - a pre-trained model that converts text into 512-dimensional vectors (embeddings).

**Features:**
- ✅ Text Similarity (0-100%)
- ✅ Semantic Search (meaning-based)
- ✅ Text Embeddings (vector representation)
- ✅ No training required (pre-trained)
- ✅ Works offline after first download

**Model Details:**
- Size: ~50MB
- First load: 15-20 seconds
- Subsequent requests: 50-200ms
- Accuracy: State-of-the-art

### Test TensorFlow

```bash
# Start server first
npm start

# In another terminal
node test-tensorflow.js
```

**Expected Output:**
```
✅ Model loaded successfully!

Testing text similarity...
Text 1: I love programming
Text 2: I enjoy coding
Similarity: 73.87% ✅

Text 1: The weather is nice
Text 2: It's a beautiful day
Similarity: 66.79% ✅
```

## 🤖 AI Chat Integration

### Groq AI (Llama 3.3 70B)

The backend uses **Groq AI** instead of OpenAI for faster and free responses.

**Features:**
- ✅ Free API (no credit card required)
- ✅ Fast responses (< 1 second)
- ✅ Llama 3.3 70B model
- ✅ OpenAI-compatible API

**Configuration:**
```javascript
// services/openai.js
const model = "llama-3.3-70b-versatile";
const baseURL = "https://api.groq.com/openai/v1";
```

**To switch to OpenAI:**
1. Get OpenAI API key from https://platform.openai.com
2. Replace in `.env`: `OPENAI_API_KEY=sk-...`
3. Model will auto-detect and use OpenAI

## 📁 Project Structure

```
ai-backend/
├── config/
│   └── database.js          # MongoDB connection
├── models/                  # Database models
├── routes/
│   ├── ai.js               # TensorFlow endpoints
│   ├── chat.js             # AI chat endpoint
│   ├── weather.js          # Weather API
│   ├── email.js            # Email service
│   └── commands.js         # Command detection
├── services/
│   ├── tensorflowService.js # TensorFlow logic
│   ├── openai.js           # Groq/OpenAI integration
│   ├── weather.js          # Weather service
│   ├── email.js            # Email service
│   └── commandEngine.js    # Command parser
├── utils/                  # Helper functions
├── .env                    # Environment variables
├── server.js               # Main server file
├── test-tensorflow.js      # TensorFlow test
└── README.md              # This file
```

## 🧪 Testing

### Test API with curl

**Chat:**
```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d "{\"message\":\"Hello\"}"
```

**Similarity:**
```bash
curl -X POST http://localhost:5000/ai/similarity \
  -H "Content-Type: application/json" \
  -d "{\"text1\":\"Hello\",\"text2\":\"Hi\"}"
```

**Weather:**
```bash
curl http://localhost:5000/weather?city=London
```

### Test with Postman

Import these endpoints:
- `POST http://localhost:5000/chat`
- `POST http://localhost:5000/ai/similarity`
- `POST http://localhost:5000/ai/embeddings`
- `GET http://localhost:5000/weather?city=London`

## 🐛 Troubleshooting

### Port 5000 already in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <process_id>

# Mac/Linux
lsof -i :5000
kill -9 <process_id>
```

### Model not loading?
- Check internet connection (first download ~50MB)
- Wait 15-20 seconds
- Check logs for errors
- Try: `node test-tensorflow.js`

### Groq API not working?
- Check API key in `.env`
- Verify key starts with `gsk_`
- Test at: https://console.groq.com

### MongoDB connection error?
- Install MongoDB: https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud)
- Update `MONGODB_URI` in `.env`

## 🔐 Security

- ✅ CORS enabled for all origins (development)
- ✅ Environment variables for secrets
- ✅ No API keys in code
- ⚠️ For production: Add authentication, rate limiting, HTTPS

## 📊 Performance

- **Chat Response**: < 1 second (Groq AI)
- **Text Similarity**: 50-200ms (after model load)
- **Model Load**: 15-20 seconds (first time only)
- **Embeddings**: 100-300ms per batch

## 🚀 Deployment

### Local Network
```bash
npm start
# Access from: http://192.168.1.23:5000
```

### Production (Heroku/Railway/Render)
1. Set environment variables
2. Change MongoDB to Atlas
3. Add authentication
4. Enable HTTPS

## 📝 Notes

- TensorFlow model downloads automatically on first run
- Groq AI is free and fast (no credit card needed)
- Backend must run before desktop/mobile apps
- All endpoints return JSON

## 🆘 Support

Issues? Check:
1. Backend logs for errors
2. `.env` file configuration
3. Port 5000 availability
4. Internet connection (for model download)

---

**Backend ready! Start desktop/mobile apps now.** 🚀
# ai-backend
