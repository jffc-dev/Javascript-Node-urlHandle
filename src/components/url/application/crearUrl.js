/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ url }) => {
    const newUrl = {
      url: url
    }

    return await UrlRepository.add(newUrl)
  }
}
