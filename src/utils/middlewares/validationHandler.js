import createError from 'http-errors'
import { config } from '../../config.js'

/**
 * @param {object} data
 * @param {import('joi').Schema schema}
 */

const validate = (data, schema) => {
  const { error } = schema.validate(data)
  return error
}

const validationHandler = (schema, check = 'body') => {
  return (req, _, next) => {
    const err = validate(req[check], schema)
    if (err) {
      next(createError.BadRequest(config.dev ? err : null))
    } else {
      next()
    }
  }
}

export default validationHandler
