/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ PlaylistRepository }) => {
  return async () => {
    return await PlaylistRepository.getAll()
  }
}
