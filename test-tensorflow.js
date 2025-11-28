import axios from 'axios';

const API_URL = 'http://localhost:5000';

async function testSimilarity() {
    console.log('\n=== Testing Text Similarity ===\n');

    const tests = [{
            text1: "I love programming",
            text2: "I enjoy coding"
        },
        {
            text1: "The weather is nice today",
            text2: "It's a beautiful day"
        },
        {
            text1: "Hello world",
            text2: "Goodbye moon"
        }
    ];

    for (const test of tests) {
        try {
            const response = await axios.post(`${API_URL}/ai/similarity`, test);
            console.log(`Text 1: "${test.text1}"`);
            console.log(`Text 2: "${test.text2}"`);
            console.log(`Similarity: ${response.data.percentage}`);
            console.log('---');
        } catch (error) {
            console.error('Error:', error.message);
        }
    }
}

async function testEmbeddings() {
    console.log('\n=== Testing Text Embeddings ===\n');

    try {
        const response = await axios.post(`${API_URL}/ai/embeddings`, {
            texts: ["Hello", "World", "AI Assistant"]
        });

        console.log(`Generated ${response.data.count} embeddings`);
        console.log(`Embedding dimension: ${response.data.embeddings[0].length}`);
        console.log('First embedding (first 10 values):', response.data.embeddings[0].slice(0, 10));
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run tests
console.log('Starting TensorFlow.js tests...');
console.log('Make sure server is running on port 5000\n');

await testSimilarity();
await testEmbeddings();

console.log('\n✅ Tests completed!');