const { Contact } = require('../models/contacts')
const { ctrlWrapper } = require('../decorators/ctrlWrapper');
const { HttpError } = require('../helpers/index');


const getListContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner },
    '-createdAt -updatedAt',
    { skip, limit }).populate("owner", "email");
  res.json(result);
};
const getById = async (req, res,) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById({ _id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};
const addContact = async (req, res,) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result)
};

const updateById = async (req, res,) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id, owner }, req.body);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id, owner });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({ message: "contact deleted" });
};
const updateFavorite = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id, owner }, req.body, { new: true });
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
