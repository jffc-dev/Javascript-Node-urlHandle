import MongoLib from '../../../lib/mongo.js'

class MongoUrlRepository {
  constructor () {
    this.collection = 'url'
    this.mongoDB = new MongoLib()
  }

  async add (person) {
    const id = await this.mongoDB.create(this.collection, person)
    return { id, ...person }
  }

  async addMany (urls) {
    const urlsArray = urls.split('\n')

    const { ops: rpta } = await this.mongoDB.createMany(this.collection, urlsArray.map(function (cadena) {
      return { url: cadena, audi_createdDate: new Date() }
    }))

    return rpta
  }

  async delete (id) {
    const result = await this.mongoDB.delete(this.collection, id)
    return result
  }

  async get (id) {
    const url = await this.mongoDB.get(this.collection, id)
    return { url }
  }

  async getAll () {
    const urls = await this.mongoDB.getAll(this.collection)
    return { urls }
  }

  async getRandom (size) {
    const urls = await this.mongoDB.getRandom(this.collection, size)
    return { urls }
  }

  async getNewExcept (except, size) {
    const urls = await this.mongoDB.getNewExcept(this.collection, except, size)
    return { urls }
  }

  async addTitle (id, title) {
    const responseGet = await this.mongoDB.get(this.collection, id)

    if (responseGet) {
      const { titles } = responseGet
      const newId = titles ? Math.max(...titles.map(o => o._id), 0) + 1 : 1
      const newObj = { _id: newId, title: title, audi_createdDate: new Date() }
      const { result } = await this.mongoDB.updatePush(this.collection, id, { titles: newObj })

      const rpta = {
        status: result.ok === 1 ? 1 : 0,
        msg: result.ok === 1 ? 'Se agregó el título correctamente.' : 'No se encontró la url.',
        rpta: newObj
      }
      return rpta
    } else {
      return {
        status: 0,
        msg: 'No se encontró la url.',
        rpta: ''
      }
    }
  }

  async addReset (id, newUrl) {
    let responseGet = await this.mongoDB.get(this.collection, id)
    if (responseGet) {
      const { resets } = responseGet
      const newId = resets ? Math.max(...resets.map(o => o._id), 0) + 1 : 1
      const newObj = { _id: newId, url: newUrl, audi_createdDate: new Date() }
      await this.mongoDB.updatePush(this.collection, id, { resets: newObj })
      responseGet = await this.mongoDB.get(this.collection, id)
      return responseGet
    } else {
      return null
    }
  }
}

export default MongoUrlRepository
