/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

 export default ({ UrlRepository }) => {
    return async ({ urls }) => {  
      return await UrlRepository.addMany(urls)
    }
  }
  