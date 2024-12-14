import express from 'express'
import { ttp } from '../func/tools/text.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const { text, color } = req.query
  const results = await ttp(text, color)
  res.json({ creater: 'Qasim Ali', results })
})

export default router
