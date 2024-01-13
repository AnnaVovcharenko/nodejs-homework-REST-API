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

// const limits = {
//     fileSize: 250 * 250 * 5,
// };

// const fileFilter = (req, file, callback)=> {
//     const extention = req.originalname.split(".").pop();
//     if(extention === "exe") {
//         callback(HttpError(400, ".exe not valid extention"));
//     }
// }

const upload = multer({
    storage,
    // limits,
    // fileFilter,
})


// const destination = path.resolve("tmp");

// const storage = multer.diskStorage({
//   destination,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage,
// });


module.exports = upload;


