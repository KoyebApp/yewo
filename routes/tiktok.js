import express from 'express';
import Tiktok from '../func/tiktok.js';  // Import the TikTok function

const router = express.Router();

router.get('/tiktok', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ creator: 'Qasim Ali', status: false, msg: 'URL is required' });
    }

    try {
        const result = await Tiktok(url);  // Call the Tiktok function with the URL
        res.json(result);  // Send the video metadata back as the response
    } catch (error) {
        console.error('Error in /tiktok route:', error);  // Log the error for debugging
        res.status(500).json({
            creator: 'Qasim Ali',
            status: false,
            msg: error.message || 'Unknown error occurred',
        });  // Send the error message in the response
    }
});

export default router;
