/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoPersonRepository')} obj.PersonRepository
 */

export default ({ UrlRepository }) => {
  return async ({ idUrl, array, idTitle }) => {
    return await UrlRepository.deleteElementFromArray(idUrl, array, idTitle)
  }
}
