import express from 'express'
import {
  createPlaylist,
  getAllPlaylist
} from '../components/playlist/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createPlaylistSchema } from '../components/playlist/domain/add.js'

const router = express.Router()

router.post('/', validationHandler(createPlaylistSchema), createPlaylist)
router.get('/', getAllPlaylist)

export default router
