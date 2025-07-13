import express from 'express'
import {
  createPlaylist,
  getAllPlaylists,
  createPlaylistWithList,
  getPlaylist
} from '../components/playlist/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createPlaylistSchema } from '../components/playlist/domain/add.js'

const router = express.Router()

router.post('/', validationHandler(createPlaylistSchema), createPlaylist)
router.get('/', getAllPlaylists)
router.get('/:id', getPlaylist)
router.post('/save-list', createPlaylistWithList)

export default router
