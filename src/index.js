import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'

// Routes
import apiUrlHandle from './routes/url.js'
import apiPlaylistHandle from './routes/playlist.js'
import { handleError, handleNotFound } from './routes/general.js'

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(express.json())
app.use('/api/url/', apiUrlHandle)
app.use('/api/playlist/', apiPlaylistHandle)

app.use(handleNotFound)

app.use(handleError)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
