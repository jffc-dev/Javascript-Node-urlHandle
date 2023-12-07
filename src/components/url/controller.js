import MongoUrlRepository from './infraestructure/MongoUrlRepository.js'
import AddUrlRepo from './application/addUrl.js'
import AddMultipleUrlRepo from './application/addMultipleUrl.js'
// import AddMultipleUrlDetailedRepo from './application/addMultipleUrlDetailed.js'
import GetNewUrlRepo from './application/getNewUrl.js'
import DeleteUrlRepo from './application/deleteUrl.js'
import DeleteTitleFromUrlRepo from './application/deleteTitleFromUrl.js'
import ObtenerUnaUrl from './application/obtenerUnaUrl.js'
import ObtenerUrls from './application/obtenerUrls.js'
import ObtenerUrlsRandom from './application/obtenerUrlsRandom.js'
import ObtenerContenidoUrl from './application/obtenerContenidoUrl.js'
import GetUrlsPaginate from './application/getUrls.js'
import CountUrls from './application/countUrls.js'
import AgregarTituloUrl from './application/agregarTituloUrl.js'
import ReestablecerUrl from './application/restablecerUrl.js'
import GetByArrayRepo from './application/getByArray.js'
import { AppResponse, AppResponseDataPaginated } from '../../utils/general.js'

import { ResetUrlModel } from './model/urlValidation.js'
import { STATUS_RESPONSE_ERROR, STATUS_RESPONSE_OK, STATUS_RESPONSE_WARNING } from '../../utils/constants/general.js'
// import { StatusValidation } from './model/validation.js'

const UrlRepository = new MongoUrlRepository()

export const crearUrl = async (req, res, next) => {
  try {
    const query = AddUrlRepo({ UrlRepository })
    const person = await query(req.body)
    res.status(201).json({
      person,
      message: 'Url Creada Exitosamente'
    })
  } catch (e) {
    next(e)
  }
}

export const createMultipleUrl = async (req, res, next) => {
  try {
    const query = AddMultipleUrlRepo({ UrlRepository })
    const urls = await query(req.body)
    const rsp = new AppResponse(1, 'Urls were successfully created.', urls)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const createMultipleUrlDetailed = async (req, res, next) => {
  try {
    const query = GetByArrayRepo({ UrlRepository })
    const { urls: urlsInput } = req.body
    const urls = []
    for (const urlInput of urlsInput) {
      const linkRsp = await query({ data: urlInput })
      urls.push(linkRsp)
    }
    const createdLinks = urls.filter((url) => url.foundUrl === null)
    const errorLinks = urls.filter((url) => url.foundUrl !== null)
    const responseData = {
      createdLinks: createdLinks,
      errorLinks: errorLinks
    }

    if (urls.length === createdLinks.length) {
      const rsp = new AppResponse(STATUS_RESPONSE_OK, 'Urls were created successfully.', responseData)
      res.status(201).json(rsp)
    } else if (urls.length < createdLinks.length && urls.length > 0) {
      const rsp = new AppResponse(STATUS_RESPONSE_WARNING, `${createdLinks.length} of ${urls.length} urls were created successfully.`, responseData)
      res.status(201).json(rsp)
    } else {
      const rsp = new AppResponse(STATUS_RESPONSE_ERROR, 'None url was created successfully.', responseData)
      res.status(201).json(rsp)
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
}

export const deleteUrlById = async (req, res, next) => {
  try {
    const query = DeleteUrlRepo({ UrlRepository })
    const { deletedCount, id } = await query({ id: req.params.id })
    if (deletedCount > 0) {
      const rsp = new AppResponse(1, 'Url was successfully deleted.', id)
      res.status(201).json(rsp)
    } else {
      const rsp = new AppResponse(0, 'Url not found.', { })
      res.status(404).json(rsp)
    }
  } catch (e) {
    next(e)
  }
}

export const obtenerUnaUrl = async (req, res, next) => {
  try {
    const query = ObtenerUnaUrl({ UrlRepository })
    const url = await query({ id: req.params.id })
    res.status(201).json({
      ...url
    })
  } catch (e) {
    next(e)
  }
}

export const obtenerUrls = async (_, res, next) => {
  try {
    const query = ObtenerUrls({ UrlRepository })
    const { urls } = await query()
    const rsp = new AppResponse(1, 'Url was successfully loaded.', urls)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const obtenerUrlsRandom = async (req, res, next) => {
  try {
    const query = ObtenerUrlsRandom({ UrlRepository })
    const { urls } = await query({ size: req.params.size })
    const rsp = new AppResponse(1, 'Url was successfully loaded.', urls)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const obtenerContenidoUrl = async (req, res, next) => {
  try {
    const query = ObtenerContenidoUrl({ UrlRepository })
    const contenido = await query({ url: req.body.url })
    const rsp = new AppResponse(1, 'Url was successfully loaded.', { id: req.body.id, ...contenido })
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const addTitleToUrl = async (req, res, next) => {
  try {
    const query = AgregarTituloUrl({ UrlRepository })
    const result = await query({ id: req.params.id, title: req.body.title })
    if (result) {
      const rsp = new AppResponse(1, 'Url was successfully restored.', { ...result })
      res.status(201).json(rsp)
    } else {
      const rsp = new AppResponse(0, 'Url not found.', { })
      res.status(404).json(rsp)
    }
  } catch (e) {
    next(e)
  }
}

export const restoredUrl = async (req, res, next) => {
  try {
    const query = ReestablecerUrl({ UrlRepository })
    // const statusValidation = new StatusValidation(null, '')
    const data = new ResetUrlModel(req.params.id, req.body.newUrl)

    const result = await query(data)
    if (result) {
      const rsp = new AppResponse(1, 'Url was successfully restored.', { ...result })
      res.status(201).json(rsp)
    } else {
      const rsp = new AppResponse(0, 'Url not found.', { })
      res.status(404).json(rsp)
    }
  } catch (e) {
    next(e)
  }
}

export const getNewUrl = async (req, res, next) => {
  try {
    const query = GetNewUrlRepo({ UrlRepository })
    const { urls } = await query(req.body)
    const rsp = new AppResponse(1, 'Url(s) were successfully listed.', urls)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const getUrlsPaginate = async (req, res, next) => {
  try {
    const { page, size } = req.query
    const queryCou = CountUrls({ UrlRepository })
    const { count } = await queryCou({ size, page })
    const queryPag = GetUrlsPaginate({ UrlRepository })
    const { urls } = await queryPag({ size, page })
    const totalPages = Math.ceil(parseInt(count) / parseInt(size))
    const data = new AppResponseDataPaginated(urls, count, totalPages, parseInt(page))
    const rsp = new AppResponse(1, 'Url was successfully loaded.', data)
    res.status(201).json(rsp)
  } catch (e) {
    next(e)
  }
}

export const deleteTitleFromUrl = async (req, res, next) => {
  try {
    const { idTitle } = req.body
    const query = DeleteTitleFromUrlRepo({ UrlRepository })
    const result = await query({ idUrl: req.params.id, array: 'titles', idTitle })
    const queryGet = ObtenerUnaUrl({ UrlRepository })
    const { url: urlFound } = await queryGet({ id: req.params.id })
    if (result) {
      const rsp = new AppResponse(1, 'Title was successfully deleted.', urlFound)
      res.status(201).json(rsp)
    } else {
      const rsp = new AppResponse(0, 'Title not found.', { })
      res.status(404).json(rsp)
    }
  } catch (e) {
    next(e)
  }
}
