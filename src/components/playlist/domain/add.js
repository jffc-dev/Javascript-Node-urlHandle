import Joi from 'joi'

export const createPlaylistSchema = Joi.object({
  name: Joi.string().alphanum().required().label('nombre'),
  description: Joi.string().alphanum().required().allow('').label('descripción'),
  urls: Joi.array().items(Joi.string().alphanum()).required().label('urls')
})
