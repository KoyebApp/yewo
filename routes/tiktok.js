import express from 'express';
import Tiktok from '../func/tiktok.js';

const router = express.Router();
router.get('/tiktok', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ creator: 'Qasim Ali', status: false, msg: 'URL is required' });
  }

  try {
    // Call the Tiktok function with the URL
    const result = await Tiktok(url);
    res.json(result); // Send the video metadata back as the response
  } catch (error) {
    res.status(500).json({ creator: 'Qasim Ali', status: false, msg: error.message });
  }
});

export default router;
