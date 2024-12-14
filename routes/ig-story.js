import InstagramStory from '../func/ig-story.js'
import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const query = req.query.username
  if (!query)
    return res.json({ creator: 'Guru sensei', status: false, msg: 'Qasim Ali' })
  const igstory = await InstagramStory(query)
  res.json({ creator: 'Qasim Ali', data: igstory })
})

export default router
