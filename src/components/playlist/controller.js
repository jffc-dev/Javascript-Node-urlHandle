import MongoPlaylistRepository from './infraestructure/MongoPlaylistRepository.js'
import createPlaylistRepo from './application/createPlaylist.js'
import getAllPlaylistRepo from './application/getAllPlaylist.js'
import { AppResponse } from '../../utils/general.js'

const PlaylistRepository = new MongoPlaylistRepository()

export const createPlaylist = async (req, res, next) => {
  try {
    const query = createPlaylistRepo({ PlaylistRepository })
    const { id } = await query(req.body)
    const rsp = new AppResponse(1, 'Playlist was successfully created.', { id })
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const getAllPlaylist = async (req, res, next) => {
  try {
    const query = getAllPlaylistRepo({ PlaylistRepository })
    const { playlists } = await query()
    const rsp = new AppResponse(1, 'Playlist was successfully listed.', playlists)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}
