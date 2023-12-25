const Contact = require('../models/contacts')
const {ctrlWrapper} = require('../decorators/ctrlWrapper');
// const { HttpError } = require('../helpers/index');
// const { contactAddSchema, contactUpSchema } = require("../schemas/contact-schemas");




const getListContacts = async (req, res) => {
  
    const result = await Contact.find({}, '-createdAt -updatedAt'); 
    res.json(result); 
};
// const getById = async (req, res,) => {
//     const { id } = req.params;
//     const result = await Contact.getContactById(id);//.findById(contactId);
//     if (!result) throw HttpError(404, `Not found`);
//      res.json(result);
// };
// const addContact = async (req, res,) => {
//     const result = await Contact.addContact(req.body); //.create(req.body);
//     res.status(201).json(result)
//    };

// const updateById = async (req, res,) => {
//     const { id } = req.params;
//     const result = await Contact.updateContact(id, req.body);//.findByIdAndUpdate(contactId, req.body, {new: true});
//     if (!result) throw HttpError(404, `Not found`);
//     res.json(result);
//   // };

// const deleteById = async (req, res, next) => {
//     const { id } = req.params;
//     const result = await Contact.removeContact(id); findByIdAndDelete(contactId);
//     if (!result) throw HttpError(404, `Not found`);
//      res.json({ message: "contact deleted"});
//  };
// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
//   if (!result) throw HttpError(404, 'Not found');
//   res.json(result);
// };


module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  // getById: ctrlWrapper(getById),
  // addContact: ctrlWrapper(addContact) ,
  // updateById: ctrlWrapper(updateById),
  // deleteById: ctrlWrapper(deleteById),
  // updateFavorite: ctrlWrapper(updateFavorite),

}
// ({}, '-createdAt -updatedAt')