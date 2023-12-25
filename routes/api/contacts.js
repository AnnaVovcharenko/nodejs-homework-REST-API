const express = require('express')
const  controllersCont  = require('../../controllers/controllers-contacts');
const { isEmptyBody } = require('../../middlewares/index');
const { isEmptyFavorite } = require('../../middlewares/index');
const {isValidId} = require('../../middlewares/index');
const {valBody} = require('../../decorators/index');
const contactAddSchema = require('../../models/contacts');
const contactUpSchema = require('../../models/contacts');
const updateFavoriteSchema = require('../../models/contacts');
const router = express.Router()

router.get('/', controllersCont.getListContacts);

router.get('/:id', isValidId, controllersCont.getById);

router.post('/', isEmptyBody, valBody(contactAddSchema), controllersCont.addContact)

router.delete('/:id', isValidId, controllersCont.deleteById)

router.put('/:id',isValidId, isEmptyBody, valBody(contactUpSchema), controllersCont.updateById);

router.patch('/:id/favorite',isValidId, isEmptyFavorite, valBody(updateFavoriteSchema),controllersCont.updateFavorite);

module.exports = router
