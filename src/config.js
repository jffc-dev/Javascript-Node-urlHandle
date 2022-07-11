import dotenv from 'dotenv'
dotenv.config()

export const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/',
    db: 'manejoCadenas_QA'
  }
}
