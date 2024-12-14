import apkmirror from '../func/search/apkmirror.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const query = req.query.query
  if (!query) return res.json({ creator: 'Qasim Ali', status: false, msg: 'query is required' })
  const result = await apkmirror(query)
  res.json({ creator: 'Qasim Ali', data: result })
})

export default router
