import express from 'express'
import { persons } from '../utils/mockups.js'
import { crearUrl, eliminarUrl, obtenerUnaUrl, obtenerUrls, obtenerUrlsRandom, crearVariasUrls, obtenerContenidoUrl } from '../components/agenda/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createUrlSchema } from '../components/agenda/domain/add.js'

const router = express.Router()

router.get('/api/urls', obtenerUrls)

router.get('/api/urls/:id', obtenerUnaUrl)

router.get('/api/urls-random/:size', obtenerUrlsRandom)

router.delete('/api/urls/:id', eliminarUrl)

router.get('/info', (request, response) => {
  const cantPersons = persons.length
  const fecha = new Date()
  response.send(`
          <p>Phonebook has info for ${cantPersons} people</p>
          <p>${fecha}</p>
      `)
})

router.post('/api/url/', validationHandler(createUrlSchema), crearUrl)

router.post('/api/urls/', crearVariasUrls)

router.post('/api/urls/contenido', obtenerContenidoUrl)

export default router
