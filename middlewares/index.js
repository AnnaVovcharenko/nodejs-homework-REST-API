const {isEmptyBody} = require('./isEmptyBody');
const {isEmptyFavorite} = require('./inEmptyFavorit')
const {isValidId} = require('./isValidId');
const {authenticate} = require('./authenticate');
const upload = require('./upload');
module.exports ={
    isEmptyBody,
    isEmptyFavorite,
    isValidId,
    authenticate,
    upload
}