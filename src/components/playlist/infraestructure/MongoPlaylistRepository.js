import MongoLib from '../../../lib/mongo.js'
import MongoUrlRepository from '../../url/infraestructure/MongoUrlRepository.js'
import pckMongo from 'mongodb'

const { ObjectId } = pckMongo

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
    const UrlRepository = new MongoUrlRepository()
    const formatLinks = playlist.links.map((link) => ObjectId(link))
    const { urls: links } = await UrlRepository.getByArray('_id', formatLinks)
    return { ...playlist, links }
  }

  async getAll () {
    const playlists = await this.mongoDB.getAll(this.collection)
    return { playlists }
  }

  async addWithList (links) {
    const id = await this.mongoDB.create(this.collection, { links })
    return { id, links }
  }
}

export default MongoPlaylistRepository
