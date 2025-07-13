/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ id }) => {
    return await UrlRepository.get(id)
  }
}
