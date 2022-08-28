/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
    return async ({ id, newUrl }) => {
        return await UrlRepository.addReset(id, newUrl)
    }
}
