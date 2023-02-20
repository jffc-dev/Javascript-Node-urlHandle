/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonRepository')} obj.PersonRepository
 */

export default ({ UrlRepository }) => {
  return async ({ id }) => {
    return await UrlRepository.delete(id)
  }
}
