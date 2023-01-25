/**
 * @param {object} data
 * @param {import('joi').Schema schema}
 */

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
      res.status(406).json({
        status: 0,
        msg: { type, context },
        rpta: null
      })
    } else {
      next()
    }
  }
}

export default validationHandler
