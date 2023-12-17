const express = require('express')
// const contacts = require("../../models/contacts")

const controllersCont = require('../../controllers/controllers-contacts');

const router = express.Router()

router.get('/', controllersCont.getListContacts)

router.get('/:id', controllersCont.getById)

router.post('/', controllersCont.addContact)

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
