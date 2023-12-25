const express = require('express')


const controllersCont = require('../../controllers/controllers-contacts');
// const {isEmptyBody} = require('../../middlewares/index') ;

const router = express.Router()

router.get('/', controllersCont.getListContacts)

// router.get('/:id', controllersCont.getById)

// router.post('/', isEmptyBody, controllersCont.addContact)

// router.delete('/:id', controllersCont.deleteById)

// router.put('/:id', isEmptyBody, controllersCont.updateById);

module.exports = router
