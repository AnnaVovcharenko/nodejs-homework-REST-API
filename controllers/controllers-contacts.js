const {Contact} = require('../models/contacts')
const {ctrlWrapper} = require('../decorators/ctrlWrapper');
const { HttpError } = require('../helpers/index');


const getListContacts = async (req, res) => {
  const result = await Contact.find({},'-createdAt -updatedAt');
  res.json(result);
};
const getById = async (req, res,) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};
const addContact = async (req, res,) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result)
};

const updateById = async (req, res,) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: "contact deleted" });
};
const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found')
  };
  res.json(result);
};


module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),

}
