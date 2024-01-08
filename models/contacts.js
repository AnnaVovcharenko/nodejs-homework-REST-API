const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, addUpdateSettings } = require('./hooks');
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }

}, { versionKey: false, timestamps: true });

contactSchema.post('save', handleMongooseError);
contactSchema.pre("findOneAndUpdate", addUpdateSettings);

contactSchema.post("findOneAndUpdate", handleMongooseError);

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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})


const Contact = model('contact', contactSchema);

module.exports = {
  contactAddSchema,
  contactUpSchema,
  updateFavoriteSchema,
  Contact
}





