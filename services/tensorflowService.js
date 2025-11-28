import '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

let model = null;

// Load pre-trained model
export async function loadModel() {
    if (!model) {
        console.log('Loading Universal Sentence Encoder model...');
        model = await use.load();
        console.log('Model loaded successfully!');
    }
    return model;
}

// Text similarity check (0 to 1, higher = more similar)
export async function getTextSimilarity(text1, text2) {
    const encoder = await loadModel();
    const embeddings = await encoder.embed([text1, text2]);
    const embeddingsArray = await embeddings.array();

    // Calculate cosine similarity
    const similarity = cosineSimilarity(embeddingsArray[0], embeddingsArray[1]);
    return similarity;
}

// Get text embeddings (vector representation)
export async function getTextEmbeddings(texts) {
    const encoder = await loadModel();
    const embeddings = await encoder.embed(texts);
    return await embeddings.array();
}

// Cosine similarity helper
function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}