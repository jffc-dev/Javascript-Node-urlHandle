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
    const urlsArray = urls.split('\n');

    const rpta = await this.mongoDB.createMany(this.collection, urlsArray.map(function(cadena) {
      return {"url": cadena, "audi_createdDate": new Date()};
    }))
    return { rpta }
  }

  async delete (id) {
    const idx = await this.mongoDB.delete(this.collection, id)
    return { idx }
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

  async addTitle (id, title, field) {
    const {titles} = await this.mongoDB.get(this.collection, id)
    const newId = titles ? Math.max(...titles.map(o => o._id), 0) + 1 : 1
    const url = await this.mongoDB.updatePush(this.collection, id, {"titles": {"_id":newId,"title": title,"audi_createdDate": new Date()}})
    return { url }
  }
}

export default MongoUrlRepository
