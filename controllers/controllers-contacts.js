
const contacts = require("../models/contacts");
const HttpError = require('../helpers/index');
const {contactAddSchema} = require("../schemas/contact-schemas");


const getListContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
    
  } catch (error) {
    next(error);
  }    
  }
const getById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    res.json(result)
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
     
  }
  } catch (error) {
    next(error);
  }
}
const addContact = async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error);
  }
}

  module.exports = {
    getListContacts,
    getById,
    addContact

  }