import pckMongo from 'mongodb'
import { config } from '../config.js'

const { MongoClient, ObjectId } = pckMongo

const MONGO_URI = config.mongo.uri
const MONGO_DB = config.mongo.db

class MongoLib {
  constructor () {
    this.client = new MongoClient(MONGO_URI, {
      useUnifiedTopology: true
    })
    this.dbName = MONGO_DB
  }

  /**
   * @return {Promise<import('mongodb').Db>}
   */
  async connect () {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        console.log('executing promise')
        this.client.connect(err => {
          if (err) {
            return reject(err)
          }
          console.log('Connected succesfully to mongo')
          resolve(this.client.db(this.dbName))
        })
      })
    }

    return MongoLib.connection
  }

  async getAll (collection, query) {
    const db = await this.connect()
    return db.collection(collection).find(query).toArray()
  }

  async getAllPaginate (collection, query, sort, pageNumber, nPerPage) {
    const db = await this.connect()
    return db.collection(collection).find(query).sort({ _id: 1 })
      .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
      .limit(nPerPage).toArray()
  }

  async countAll (collection, query) {
    const db = await this.connect()
    return db.collection(collection).countDocuments(query)
  }

  async get (collection, id, query = null) {
    const db = await this.connect()
    query = query || { _id: ObjectId(id) }
    return db.collection(collection).findOne(query)
  }

  async create (collection, data) {
    const db = await this.connect()
    const result = await db.collection(collection).insertOne({ ...data, audi_createdDate: new Date() })
    return result.insertedId
  }

  async createMany (collection, data) {
    const db = await this.connect()
    const result = await db.collection(collection).insertMany(data)
    return result
  }

  async update (collection, id, data) {
    const db = await this.connect()
    const result = db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data })
    return result.upsertedId || id
  }

  async updatePush (collection, id, data) {
    const db = await this.connect()
    const result = db.collection(collection).updateOne({ _id: ObjectId(id) }, { $push: data })
    return result
  }

  async delete (collection, id) {
    const db = await this.connect()
    const { deletedCount } = await db.collection(collection).deleteOne({ _id: ObjectId(id) })
    return { deletedCount, id }
  }

  async getRandom (collection, size) {
    const db = await this.connect()
    return db.collection(collection).aggregate([
      { $sample: { size: parseInt(size) } }
    ]).toArray()
  }

  async getNewExcept (collection, except, size) {
    const db = await this.connect()
    return db.collection(collection).aggregate([
      { $match: { _id: { $nin: except.map((url) => { return ObjectId(url) }) } } },
      { $sample: { size: parseInt(size) } }
    ]).toArray()
  }

  async deleteElementFromArray (collection, idMain, array, idProp) {
    const db = await this.connect()
    const query = `{ "${array}": { "_id": ${idProp} } }`
    const result = await db.collection(collection).updateOne(
      { _id: ObjectId(idMain) },
      { $pull: JSON.parse(query) }
    )
    return result.upsertedId || idMain
  }
}

export default MongoLib
