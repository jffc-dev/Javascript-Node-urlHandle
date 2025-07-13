/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ size }) => {
    return await UrlRepository.getRandom(size)
  }
}
