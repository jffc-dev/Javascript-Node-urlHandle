/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPlaylistRepository')} obj.PlaylistRepository
 */

export default ({ PlaylistRepository }) => {
  return async ({ name, description, urls }) => {
    const newPlaylist = {
      name, description, urls
    }

    return await PlaylistRepository.add(newPlaylist)
  }
}
