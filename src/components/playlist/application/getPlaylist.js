/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ PlaylistRepository }) => {
  return async ({ id }) => {
    return await PlaylistRepository.get(id)
  }
}
