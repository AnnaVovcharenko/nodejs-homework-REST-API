const multer = require('multer');
const path = require('path');
// const {HttpError} = require('../helpers/index');


const destination = path.join(__dirname, "../", "tmp")


const storage = multer.diskStorage({
    destination,
    filename: (req, file, callback) => {
        const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        callback(null, filename);
    }
})



const upload = multer({
    storage,
    
})





module.exports = upload;


