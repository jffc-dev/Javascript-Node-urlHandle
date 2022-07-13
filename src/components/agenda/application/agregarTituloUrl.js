/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

 export default ({ UrlRepository }) => {
    return async ({ id, title, field }) => {
      return await UrlRepository.addTitle(id, title, field)
    }
  }
  