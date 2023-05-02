/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ field, data }) => {
    return await UrlRepository.getByArray(field, data)
  }
}
