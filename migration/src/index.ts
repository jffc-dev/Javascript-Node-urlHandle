import { MongoClient } from "mongodb";
import { Client } from "pg";

const mongoUrl = 'mongodb://localhost:27016';
const mongoDbName = 'manejoCadenas';

const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ResourceHandler',
  password: 'root',
  port: 5432,
});

async function migrate() {
  const mongoClient = new MongoClient(mongoUrl);
  try {
    await mongoClient.connect();
    const db = mongoClient.db(mongoDbName);
    const urls = db.collection('url');

    const docs = await urls.find().toArray();

    await pgClient.connect();

    for (const doc of docs) {
      const { _id, url, titles, resets, audi_createdDate } = doc;
      let title = '';

      if (titles && titles.length > 0) {
        title = titles.sort((a, b) => b._id - a._id)[0].title;
      }

      // Insert main resource
      const mainResult = await pgClient.query(
        `INSERT INTO "Resource" (title, url, status, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $4)
         RETURNING id`,
        [title, url, resets?.length > 0 ? 'OVERWRITTEN' : 'PENDING', new Date(audi_createdDate)]
      );

      const parentId = mainResult.rows[0].id;

      // If resets exist, insert them with parentId
      if (resets && resets.length > 0) {
        for (let i = 0; i < resets.length; i++) {
          const reset = resets[i];
          const active = i === resets.length - 1;

          await pgClient.query(
            `INSERT INTO "Resource" (title, url, status, "parentId", "createdAt", "updatedAt")
             VALUES ($1, $2, $3, $4, $5, $5)`,
            [title, reset.url, active ? 'PENDING' : 'OVERWRITTEN', parentId, new Date(reset.audi_createdDate)]
          );
        }
      }
    }

    console.log('Migration completed.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    await mongoClient.close();
    await pgClient.end();
  }
}

migrate();
