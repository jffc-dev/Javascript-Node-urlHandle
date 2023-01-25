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
  reestablecerUrl
} from '../components/url/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createUrlSchema } from '../components/url/domain/add.js'

const router = express.Router()

router.get('/api/urls', obtenerUrls)

router.get('/api/urls/:id', obtenerUnaUrl)

router.get('/api/urls-random/:size', obtenerUrlsRandom)

router.delete('/api/urls/:id', eliminarUrl)

router.post('/api/url/', validationHandler(createUrlSchema), crearUrl)

router.post('/api/urls/', crearVariasUrls)

router.post('/api/urls/cargar', obtenerContenidoUrl)

router.patch('/api/urls/add-title/:id', agregarTituloUrl)

router.patch('/api/urls/add-reset/:id', reestablecerUrl)

export default router
