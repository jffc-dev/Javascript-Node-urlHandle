import express from 'express'
import {
  crearUrl,
  eliminarUrl,
  obtenerUnaUrl,
  obtenerUrls,
  obtenerUrlsRandom,
  crearVariasUrls,
  obtenerContenidoUrl,
  agregarTituloUrl,
  restoredUrl,
  getNewUrl
} from '../components/url/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createUrlSchema } from '../components/url/domain/add.js'

const router = express.Router()

router.get('/api/url', obtenerUrls)

router.get('/api/urls/:id', obtenerUnaUrl)

router.get('/api/urls-random/:size', obtenerUrlsRandom)

router.delete('/api/urls/:id', eliminarUrl)

router.post('/api/urls/get-new-url/', getNewUrl)

router.post('/api/urls/', crearVariasUrls)

router.post('/api/urls/cargar', obtenerContenidoUrl)

router.patch('/api/urls/add-title/:id', agregarTituloUrl)

router.patch('/api/url/add-reset/:id', restoredUrl)

router.post('/api/url/', validationHandler(createUrlSchema), crearUrl)

export default router
