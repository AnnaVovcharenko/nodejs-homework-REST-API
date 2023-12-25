const {isEmptyBody} = require('./isEmptyBody');
const {handleMongooseError }= require('./handleMongooseError');
const isValidId = require('./isValidId');
module.exports ={
    isEmptyBody,
    handleMongooseError, 
    isValidId
}