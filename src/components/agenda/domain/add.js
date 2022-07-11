import Joi from 'joi'

const person = Joi.string().regex(/^Basic [0-9a-zA-Z]*$/)

export const personSchema = Joi.object({
  authorization: person.required()
}).options({ allowUnknown: true })

export const createUrlSchema = Joi.object({
  url: Joi.string().alphanum().required()
})
