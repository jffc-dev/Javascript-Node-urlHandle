import MongoPlaylistRepository from './infraestructure/MongoPlaylistRepository.js'
import createPlaylistRepo from './application/createPlaylist.js'
import getAllPlaylistRepo from './application/getAllPlaylist.js'
import getPlaylistRepo from './application/getPlaylist.js'
import createPlaylistWithListRepo from './application/createPlaylistWithList.js'
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

export const getAllPlaylists = async (req, res, next) => {
  try {
    const query = getAllPlaylistRepo({ PlaylistRepository })
    const { playlists } = await query()
    const rsp = new AppResponse(1, 'Playlist was successfully listed.', playlists)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const getPlaylist = async (req, res, next) => {
  try {
    const query = getPlaylistRepo({ PlaylistRepository })
    const rpta = await query({ id: req.params.id })
    console.log(rpta.links)
    const rsp = new AppResponse(1, 'Playlist was successfully listed.', rpta)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const createPlaylistWithList = async (req, res, next) => {
  try {
    const query = createPlaylistWithListRepo({ PlaylistRepository })
    const { links } = req.body
    const data = await query({ links })
    const rsp = new AppResponse(1, 'Playlist was successfully listed.', data)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}
