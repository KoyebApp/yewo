import express from 'express';
import photooxy from '../func/photooxy.js'; // Import the functions

const router = express.Router();

// Route for shadow effect
router.get('/shadow', async (req, res) => {
  let text = req.query.text;
  if (!text) return res.json({ status: false, msg: 'Text is required' });

  try {
    const result = await photooxy.pShadow(text);
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
});

// Route for romantic effect
router.get('/romantic', async (req, res) => {
  let text = req.query.text;
  if (!text) return res.json({ status: false, msg: 'Text is required' });

  try {
    const result = await photooxy.pRomantic(text);
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
});

// Route for smoke effect
router.get('/smoke', async (req, res) => {
  let text = req.query.text;
  if (!text) return res.json({ status: false, msg: 'Text is required' });

  try {
    const result = await photooxy.pSmoke(text);
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
});

// Route for burn paper effect
router.get('/burnPapper', async (req, res) => {
  let text = req.query.text;
  if (!text) return res.json({ status: false, msg: 'Text is required' });

  try {
    const result = await photooxy.pBurnPapper(text);
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
});

// Route for Naruto effect
router.get('/naruto', async (req, res) => {
  let text = req.query.text;
  if (!text) return res.json({ status: false, msg: 'Text is required' });

  try {
    const result = await photooxy.pNaruto(text);
    res.json({ status: true, result });
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
});

// Add more routes for other effects (loveMsg, msgGrass, etc.)

export default router;
