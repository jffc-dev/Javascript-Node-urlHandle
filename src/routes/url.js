import express from 'express'
import {
  crearUrl,
  deleteUrlById,
  obtenerUnaUrl,
  obtenerUrls,
  obtenerUrlsRandom,
  createMultipleUrl,
  obtenerContenidoUrl,
  agregarTituloUrl,
  restoredUrl,
  getNewUrl
} from '../components/url/controller.js'
import validationHandler from '../utils/middlewares/validationHandler.js'
import { createUrlSchema } from '../components/url/domain/add.js'

const router = express.Router()

router.get('/', obtenerUrls)

router.get('/:id', obtenerUnaUrl)

router.get('/random/:size', obtenerUrlsRandom)

router.delete('/:id', deleteUrlById)

router.post('/get-new-url/', getNewUrl)

router.post('/multiple/', createMultipleUrl)

router.post('/load/', obtenerContenidoUrl)

router.patch('/add-title/:id', agregarTituloUrl)

router.patch('/add-reset/:id', restoredUrl)

router.post('/', validationHandler(createUrlSchema), crearUrl)

export default router
