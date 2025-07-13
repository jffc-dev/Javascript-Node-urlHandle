/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ id, title }) => {
    return await UrlRepository.addTitle(id, title)
  }
}
