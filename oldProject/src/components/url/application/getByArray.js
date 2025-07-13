/**
 * @param {Object} obj
 * @param {import('../infraestructure/MongoUrlRepository')} obj.UrlRepository
 */

export default ({ UrlRepository }) => {
  return async ({ data }) => {
    const { url } = data
    const query = {
      $or: [
        {
          url: url
        },
        {
          'resets.url': url
        }
      ]
    }
    const { url: rsp } = await UrlRepository.get(0, query)
    let newLink = null
    if (rsp === null) {
      newLink = await UrlRepository.add(url)
    }

    return { url: url, newLink: newLink, foundUrl: rsp }
  }
}
