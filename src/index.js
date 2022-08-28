import express from 'express'
import apiUrlHandle from './routes/url.js'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(express.json())
app.use('/', apiUrlHandle)

app.use((req, res, next) => {
  res.status(404).send(JSON.stringify({res: "La URL a la que intenta acceder no existe"}))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
