/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ page, size }) => {
    return await UrlRepository.getAllPaginate(parseInt(page), parseInt(size))
  }
}
