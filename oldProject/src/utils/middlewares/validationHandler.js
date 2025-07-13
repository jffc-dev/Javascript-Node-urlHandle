/**
 * @param {object} data
 * @param {import('joi').Schema schema}
 */

import { AppResponse } from '../general'

const validate = (data, schema) => {
  const { error } = schema.validate(data)
  return error
}

const validationHandler = (schema, check = 'body') => {
  return (req, res, next) => {
    const err = validate(req[check], schema)
    if (err) {
      const { details: [error] } = err
      const { type, context } = error
      const errorMessage = buildMessage(type, context)
      const rsp = new AppResponse(0, errorMessage, null)
      res.status(406).json(rsp)
    } else {
      next()
    }
  }
}

const buildMessage = (type, context) => {
  if (type === 'string.empty') {
    return `One of the ${context.key} entries was empty.`
  }
  return 'An error occurred in the validation of entries'
}

export default validationHandler
