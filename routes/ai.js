import express from 'express';
import {
    getTextSimilarity,
    getTextEmbeddings,
    loadModel
} from '../services/tensorflowService.js';

const router = express.Router();

// Initialize model on server start
loadModel().catch(err => console.error('Model loading error:', err));

// Check similarity between two texts
router.post('/similarity', async (req, res) => {
    try {
        const {
            text1,
            text2
        } = req.body;

        if (!text1 || !text2) {
            return res.status(400).json({
                error: 'text1 and text2 required'
            });
        }

        const similarity = await getTextSimilarity(text1, text2);

        res.json({
            text1,
            text2,
            similarity: similarity.toFixed(4),
            percentage: (similarity * 100).toFixed(2) + '%'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Get embeddings for texts
router.post('/embeddings', async (req, res) => {
    try {
        const {
            texts
        } = req.body;

        if (!texts || !Array.isArray(texts)) {
            return res.status(400).json({
                error: 'texts array required'
            });
        }

        const embeddings = await getTextEmbeddings(texts);

        res.json({
            count: texts.length,
            embeddings
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

export default router;