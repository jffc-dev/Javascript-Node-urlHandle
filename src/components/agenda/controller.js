import MongoUrlRepository from './infraestructure/MongoUrlRepository.js'
import CrearUrl from './application/crearUrl.js'
import CrearVariasUrls from './application/crearVariasUrls.js'
import EliminarUrl from './application/eliminarUrl.js'
import ObtenerUnaUrl from './application/obtenerUnaUrl.js'
import ObtenerUrls from './application/obtenerUrls.js'
import ObtenerUrlsRandom from './application/ObtenerUrlsRandom.js'
import ObtenerContenidoUrl from './application/obtenerContenidoUrl.js'
import AgregarTituloUrl from './application/agregarTituloUrl.js'

const UrlRepository = new MongoUrlRepository()

export const crearUrl = async (req, res, next) => {
  try {
    const query = CrearUrl({ UrlRepository })
    const person = await query(req.body)
    res.status(201).json({
      person,
      message: 'Url Creada Exitosamente'
    })
  } catch (e) {
    next(e)
  }
}

export const crearVariasUrls = async (req, res, next) => {
  try {
    const query = CrearVariasUrls({ UrlRepository })
    const rpta = await query(req.body)
    res.status(201).json({
      rpta,
      message: 'Url Creada Exitosamente'
    })
  } catch (e) {
    next(e)
  }
}

export const eliminarUrl = async (req, res, next) => {
  try {
    const query = EliminarUrl({ UrlRepository })
    const id = await query(req.params.id)
    res.status(201).json({
      id,
      message: 'Url Eliminada Exitosamente'
    })
  } catch (e) {
    next(e)
  }
}

export const obtenerUnaUrl = async (req, res, next) => {
  try {
    const query = ObtenerUnaUrl({ UrlRepository })
    const url = await query({"id": req.params.id})
    res.status(201).json({
      url
    })
  } catch (e) {
    next(e)
  }
}

export const obtenerUrls = async (req, res, next) => {
  try {
    const query = ObtenerUrls({ UrlRepository })
    const urls = await query()
    res.status(201).json(urls)
  } catch (e) {
    next(e)
  }
}

export const obtenerUrlsRandom = async (req, res, next) => {
  try {
    const query = ObtenerUrlsRandom({ UrlRepository })
    const urls = await query({size: req.params.size})
    res.status(201).json({
      urls
    })
  } catch (e) {
    next(e)
  }
}


export const obtenerContenidoUrl = async (req, res, next) => {
  try {
    const queryGet = ObtenerUnaUrl({ UrlRepository })
    const {url: urlFound} = await queryGet({"id": req.body.id})
    const query = ObtenerContenidoUrl({ UrlRepository })
    const contenido = await query({url: urlFound.url})
    res.status(201).json({
      contenido
    })
  } catch (e) {
    next(e)
  }
}


export const agregarTituloUrl = async (req, res, next) => {
  try {
    const query = AgregarTituloUrl({ UrlRepository })
    const result = await query({id: req.params.id, title: req.body.title, field: {_id:0, titles: 1}})
    res.status(201).json({
      ...result
    })
  } catch (e) {
    next(e)
  }
}