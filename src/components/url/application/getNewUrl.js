/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ urls, size }) => {
    return await UrlRepository.getNewExcept(urls, size)
  }
}
