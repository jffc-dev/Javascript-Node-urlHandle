/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPlaylistRepository')} obj.PlaylistRepository
 */

export default ({ PlaylistRepository }) => {
  return async ({ links }) => {
    return await PlaylistRepository.addWithList(links)
  }
}
