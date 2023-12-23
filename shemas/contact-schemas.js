const Joi = require('joi');

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `"missing required name field`
        }), 
    email: Joi.string().required().messages({
      "any.required": `"missing required email field`
        }),
    phone: Joi.string().required().messages({
      "any.required": `"missing required phone field`
        }),
  })
  const contactUpSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  })
  module.exports = {
    contactAddSchema,
    contactUpSchema
  }