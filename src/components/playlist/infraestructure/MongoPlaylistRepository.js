import MongoLib from '../../../lib/mongo.js'

class MongoPlaylistRepository {
  constructor () {
    this.collection = 'playlist'
    this.mongoDB = new MongoLib()
  }

  async add (person) {
    const id = await this.mongoDB.create(this.collection, person)
    return { id, ...person }
  }

  async delete (id, query) {
    const idx = await this.mongoDB.update(this.collection, id)
    return { idx }
  }

  async get (id) {
    const playlist = await this.mongoDB.get(this.collection, id)
    return { playlist }
  }

  async getAll () {
    const playlists = await this.mongoDB.getAll(this.collection)
    return { playlists }
  }
}

export default MongoPlaylistRepository
