import { AppResponse } from '../utils/general'

export const handleNotFound = (req, res, next) => {
  res
    .status(404)
    .send(JSON.stringify({ res: 'La URL a la que intenta acceder no existe' }))
}

export const handleError = (err, req, res, next) => {
  const rsp = new AppResponse(0, 'An error occurred in the process. ' + err.toString(), null)
  res.status(500).json(rsp)
}
